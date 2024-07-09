import { arrayMove } from "@dnd-kit/sortable";
import { makeAutoObservable } from "mobx";
import { BasicSelectOption } from "../../../components/form/selects/BasicSelect";
import { GridLayout, GridTemplateAreas } from "../utils/cms.types";
import { CmsPageStore } from "./CmsPageStore";

type DndGridLayout = {
  [K in keyof GridLayout]: { gridIdentifier: string; id: string }[] | null;
};

function generateGridLayoutFromAreas(
  areas: GridTemplateAreas | null
): DndGridLayout[keyof GridLayout] {
  if (!areas) return null;

  return areas.flatMap((area) =>
    area.map((gridIdentifier) => ({ gridIdentifier, id: crypto.randomUUID() }))
  );
}

function generateGridAreasFromLayout(
  layout: DndGridLayout[keyof GridLayout],
  columns: number
): GridTemplateAreas | null {
  if (!layout) return null;

  const areas: GridTemplateAreas = Array.from({ length: columns }, () => []);

  for (let i = 0; i < layout.length; i++) {
    const item = layout[i];
    areas[i % columns].push(item.gridIdentifier);
  }

  return areas;
}

export class DndGridStore {
  public columns = 1;

  public activeGridLayoutKey: keyof GridLayout = "sm";

  public gridLayouts: DndGridLayout = {
    sm: [],
    medium: null,
    large: null,
    xl: null,
  };

  public activeId: string | null = null;

  constructor(private pageStore: CmsPageStore) {
    this.columns = this.pageStore.page.config.gridLayout.sm[0]?.length ?? 1;
    this.activeGridLayoutKey = "sm";
    this.gridLayouts = {
      sm: generateGridLayoutFromAreas(this.pageStore.page.config.gridLayout.sm),
      medium: generateGridLayoutFromAreas(
        this.pageStore.page.config.gridLayout.medium
      ),
      large: generateGridLayoutFromAreas(
        this.pageStore.page.config.gridLayout.large
      ),
      xl: generateGridLayoutFromAreas(this.pageStore.page.config.gridLayout.xl),
    };

    makeAutoObservable(this);
  }

  get activeGridIdentifier() {
    const foundInLayout = this.activeGridLayout?.find(
      ({ id }) => id === this.activeId
    );

    if (!foundInLayout) return "Nom inconnu";

    return foundInLayout.gridIdentifier;
  }

  setActiveGridLayoutKey(layoutKey: keyof GridLayout) {
    this.activeGridLayoutKey = layoutKey;
  }

  get activeGridLayout() {
    return this.gridLayouts[this.activeGridLayoutKey];
  }

  setColumns(columns: number) {
    if (columns < 1) {
      this.columns = 1;
      return;
    }
    this.columns = columns;
  }

  setActiveId(id: string | null) {
    this.activeId = id;
  }

  orderLayout(sourceId: string, targetId: string) {
    const items = this.gridLayouts[this.activeGridLayoutKey];

    if (!items) return;

    const oldIndex = items.findIndex(({ id }) => id === sourceId);
    const newIndex = items.findIndex(({ id }) => id === targetId);

    if (oldIndex === newIndex) return items;
    if (oldIndex === -1 || newIndex === -1) return items;

    this.gridLayouts[this.activeGridLayoutKey] = arrayMove(
      items,
      oldIndex,
      newIndex
    );
  }

  get gridLayoutsOptions(): BasicSelectOption<keyof GridLayout>[] {
    const opts = Object.keys(this.gridLayouts).map((layout) => ({
      label: layout,
      value: layout as keyof GridLayout,
    }));

    return opts;
  }

  generateAreas(): GridLayout {
    const sm = generateGridAreasFromLayout(this.gridLayouts.sm, this.columns);

    if (!sm) throw new Error("sm grid layout is null, this should not happen");

    return {
      sm,
      medium: generateGridAreasFromLayout(
        this.gridLayouts.medium,
        this.columns
      ),
      large: generateGridAreasFromLayout(this.gridLayouts.large, this.columns),
      xl: generateGridAreasFromLayout(this.gridLayouts.xl, this.columns),
    };
  }
}
