import { makeAutoObservable } from "mobx";
import { BasicSelectOption } from "../../../components/form/selects/BasicSelect";
import { notifyApiError } from "../../../errors/notifyApiError";
import {
  BlockProps,
  CmsConfig,
  CmsPage,
  LayoutParams,
} from "../utils/cms.types";
import { DndGridStore } from "./DndGridStore";
import type { PageDto } from "./hooks/useCreateOrUpdatePage";

type CmsPageCrud = Omit<CmsPage, "id" | "config"> & {
  id: number | null;
  config: Omit<CmsPage["config"], "layout"> & {
    layout: LayoutParams | null;
  };
};

const getDefaultPage = (): CmsPageCrud => {
  return {
    id: null,
    url: "",
    title: "",
    internal_label: "",
    is_published: false,
    views: 0,
    config: {
      layout: null,
      blocks: [],
      gridLayout: {
        sm: [],
        medium: null,
        large: null,
        xl: null,
      },
    },
    created_at: new Date(),
    updated_at: new Date(),
  };
};

export class CmsPageStore {
  public page: CmsPageCrud;
  public config: CmsConfig;
  public formErrors: Record<string, string | undefined> = {};

  public gridStore: DndGridStore;

  public blockIdToEdit: string | null = null;
  public editLayoutProps = false;

  constructor(config: CmsConfig, page?: CmsPageCrud) {
    this.config = config;
    this.page = page ?? getDefaultPage();
    this.gridStore = new DndGridStore(this);
    makeAutoObservable(this);
  }

  setEditLayoutProps(state: boolean) {
    this.editLayoutProps = state;
  }

  setBlockIdToEdit(id: string | null) {
    this.blockIdToEdit = id;
  }

  get blockPropsToEdit() {
    if (!this.blockIdToEdit) return null;

    const block = this.page.config.blocks.find(
      ({ id }) => id === this.blockIdToEdit
    );

    if (!block) return null;

    return block.props;
  }

  updateLayoutProps(newData: object) {
    if (!this.editLayoutProps || this.page.config.layout === null) return;

    const props = newData as LayoutParams["props"];

    this.page.config.layout.props = props;
  }

  updateBlockProps(newData: object) {
    if (!this.blockIdToEdit) return;

    if ("gridIdentifier" in newData === false) {
      return notifyApiError({ error: "gridIdentifier est requis" });
    }
    if (typeof newData.gridIdentifier !== "string") {
      return notifyApiError({
        error: "gridIdentifier doit être une chaîne de caractères",
      });
    }

    const props = newData as BlockProps;

    const gridIdentifier = {
      old: "",
      new: props.gridIdentifier,
    };

    this.page.config.blocks = this.page.config.blocks.map((block) => {
      if (block.id !== this.blockIdToEdit) return block;

      gridIdentifier.old = block.props.gridIdentifier;

      return {
        ...block,
        props,
      };
    });

    if (gridIdentifier.old !== gridIdentifier.new) {
      this.gridStore.renameGridIdentifier(
        gridIdentifier.old,
        gridIdentifier.new
      );
    }
  }

  setStringField(field: "url" | "title" | "internal_label", value: string) {
    this.page[field] = value;
    this.formErrors[field] = undefined;
  }

  setBooleanField(field: "is_published", value: boolean) {
    this.page[field] = value;
    this.formErrors[field] = undefined;
  }

  setLayout(layout: string) {
    const foundLayout = this.config.layouts.find(({ name }) => name === layout);

    if (!foundLayout) {
      this.page.config.layout = null;
      return;
    }

    this.page.config.layout = {
      name: foundLayout.name,
      props: foundLayout.propsExample,
    };
  }

  get layoutOptions(): BasicSelectOption<string>[] {
    const baseOptions = this.config.layouts.map(({ name }) => ({
      label: name,
      value: name,
    }));

    return [{ label: "Aucun", value: "" }, ...baseOptions];
  }

  get blockOptions(): BasicSelectOption<string>[] {
    const baseOptions = this.config.blocks.map(({ name }) => ({
      label: name,
      value: name,
    }));

    return [{ label: "Aucun", value: "" }, ...baseOptions];
  }

  addBlock(name: string) {
    const foundBlock = this.config.blocks.find(({ name: n }) => n === name);

    if (!foundBlock) return;

    const occurrences = this.page.config.blocks.filter(
      ({ name }) => name === foundBlock.name
    );

    const gridIdentifier = `${foundBlock.name}-${occurrences.length}`;

    const block = {
      name: foundBlock.name,
      props: { ...foundBlock.propsExample, gridIdentifier },
      id: crypto.randomUUID(),
    };

    this.page.config.blocks.push(block);
    this.gridStore.add({
      gridIdentifier,
      id: block.id,
    });
  }

  get blocks() {
    return this.page.config.blocks.map((block) => ({
      id: block.id,
      block,
    }));
  }

  get formDto(): PageDto | string {
    if (!this.page.config.layout) {
      return "Le layout est requis";
    }

    return {
      id: this.page.id ?? -1,
      title: this.page.title,
      url: this.page.url,
      internal_label: this.page.internal_label,
      is_published: this.page.is_published,
      config: {
        layout: this.page.config.layout,
        blocks: this.page.config.blocks,
        gridLayout: this.gridStore.generateAreas(),
      },
    };
  }
}
