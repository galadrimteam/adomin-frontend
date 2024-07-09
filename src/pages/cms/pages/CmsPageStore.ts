import { makeAutoObservable } from "mobx";
import { BasicSelectOption } from "../../../components/form/selects/BasicSelect";
import { CmsConfig, CmsPage, LayoutParams } from "../utils/cms.types";
import { DndGridStore } from "./DndGridStore";

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
        medium: [],
        large: [],
        xl: [],
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

  constructor(config: CmsConfig, page?: CmsPageCrud) {
    this.config = config;
    this.page = page ?? getDefaultPage();
    this.gridStore = new DndGridStore(this);
    makeAutoObservable(this);
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

  removeBlock(idToRemove: string) {
    this.page.config.blocks = this.page.config.blocks.filter(
      ({ id }) => id !== idToRemove
    );
  }

  duplicateBlock(idToDuplicate: string) {
    const blockIndex = this.page.config.blocks.findIndex(
      ({ id }) => id === idToDuplicate
    );

    if (blockIndex === -1) return;

    const block = this.page.config.blocks[blockIndex];

    this.page.config.blocks.splice(blockIndex, 0, {
      name: block.name,
      props: { ...block.props },
      id: crypto.randomUUID(),
    });
  }

  addBlock(name: string) {
    const foundBlock = this.config.blocks.find(({ name: n }) => n === name);

    if (!foundBlock) return;

    const occurrences = this.page.config.blocks.filter(
      ({ name }) => name === foundBlock.name
    );

    const gridIdentifier = `${foundBlock.name}-${occurrences.length}`;

    this.page.config.blocks.push({
      name: foundBlock.name,
      props: { ...foundBlock.propsExample, gridIdentifier },
      id: crypto.randomUUID(),
    });
  }

  get blocks() {
    return this.page.config.blocks.map((block) => ({
      id: block.id,
      block,
    }));
  }
}
