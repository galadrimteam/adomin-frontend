import { arrayMove } from "@dnd-kit/sortable";
import { makeAutoObservable } from "mobx";
import { BasicSelectOption } from "../../../components/form/selects/BasicSelect";
import { GridLayout, GridTemplateAreas } from "../utils/cms.types";
import { CmsPageStore } from "./CmsPageStore";

const BREAKPOINTS = ["sm", "medium", "large", "xl"] as const;

type Breakpoint = (typeof BREAKPOINTS)[number];

type DndGridLayout = {
  [K in Breakpoint]: {
    grid: { gridIdentifier: string; id: string }[];
    columns: number;
  } | null;
};

// more or less transforms [[1,2],[3,4]] into [1,2,3,4]
function generateGridLayoutFromAreas(
  areas: GridTemplateAreas | null
): DndGridLayout[Breakpoint] {
  if (!areas) return null;

  const columns = areas[0]?.length ?? 1;
  const grid = areas.flatMap((area) =>
    area.map((gridIdentifier) => ({ gridIdentifier, id: crypto.randomUUID() }))
  );

  return {
    columns,
    grid,
  };
}

console.log(
  generateGridAreasFromLayout({
    columns: 2,
    grid: [
      { gridIdentifier: "1", id: "1" },
      { gridIdentifier: "2", id: "2" },
      { gridIdentifier: "3", id: "3" },
      { gridIdentifier: "4", id: "4" },
    ],
  })
);

// more or less transforms [1,2,3,4] into [[1,2],[3,4]]
function generateGridAreasFromLayout(
  layout: DndGridLayout[Breakpoint]
): GridTemplateAreas | null {
  if (!layout) return null;

  const areas: GridTemplateAreas = [];

  for (let i = 0; i < layout.grid.length; i++) {
    const item = layout.grid[i];
    const index = Math.floor(i / layout.columns);

    if (!areas[index]) areas.push([]);

    areas[index].push(item.gridIdentifier);
  }

  return areas;
}

export class DndGridStore {
  public activeGridLayoutKey: Breakpoint = "sm";

  public gridLayouts: DndGridLayout;

  public activeId: string | null = null;

  constructor(private pageStore: CmsPageStore) {
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

  getPreviousGridLayoutKey(layoutKey: Breakpoint) {
    const index = BREAKPOINTS.indexOf(layoutKey);

    if (index === -1) return null;

    return BREAKPOINTS[index - 1] ?? null;
  }

  generateDefaultGridLayout(): DndGridLayout[Breakpoint] {
    return generateGridLayoutFromAreas(
      this.pageStore.page.config.gridLayout.sm
    );
  }

  findRecursivelyPreviousGridLayout(
    layoutKey: Breakpoint
  ): DndGridLayout[Breakpoint] {
    if (layoutKey === "sm") return this.generateDefaultGridLayout();

    const previousLayoutKey = this.getPreviousGridLayoutKey(layoutKey)!;
    const previousLayout = this.gridLayouts[previousLayoutKey];

    if (!previousLayout) {
      return this.findRecursivelyPreviousGridLayout(previousLayoutKey);
    }

    return previousLayout;
  }

  addGridLayout(layoutKey: Breakpoint) {
    const layoutToDuplicate = this.findRecursivelyPreviousGridLayout(layoutKey);

    if (!layoutToDuplicate) return;

    this.gridLayouts[layoutKey] = {
      columns: layoutToDuplicate.columns,
      grid: layoutToDuplicate.grid.map(({ id, gridIdentifier }) => ({
        id,
        gridIdentifier,
      })),
    };
  }

  get activeGridIdentifier() {
    const foundInLayout = this.activeGridLayout?.grid.find(
      ({ id }) => id === this.activeId
    );

    if (!foundInLayout) return "Nom inconnu";

    return foundInLayout.gridIdentifier;
  }

  setActiveGridLayoutKey(layoutKey: Breakpoint) {
    this.activeGridLayoutKey = layoutKey;
  }

  get activeGridLayout() {
    return this.gridLayouts[this.activeGridLayoutKey];
  }

  get activeColumns() {
    return this.activeGridLayout?.columns ?? 1;
  }

  setColumns(columns: number) {
    const layout = this.gridLayouts[this.activeGridLayoutKey];

    if (!layout) return;

    if (columns < 1) {
      layout.columns = 1;
      return;
    }

    layout.columns = columns;
  }

  setActiveId(id: string | null) {
    this.activeId = id;
  }

  orderLayout(sourceId: string, targetId: string) {
    const layout = this.gridLayouts[this.activeGridLayoutKey];

    if (!layout) return;

    const items = layout.grid;

    const oldIndex = items.findIndex(({ id }) => id === sourceId);
    const newIndex = items.findIndex(({ id }) => id === targetId);

    if (oldIndex === newIndex) return items;
    if (oldIndex === -1 || newIndex === -1) return items;

    layout.grid = arrayMove(items, oldIndex, newIndex);
  }

  renameGridIdentifier(oldGridIdentifier: string, newGridIdentifier: string) {
    for (const layout of BREAKPOINTS) {
      if (!this.gridLayouts[layout]?.grid) continue;

      const layoutGrid = this.gridLayouts[layout]!.grid;

      this.gridLayouts[layout]!.grid = layoutGrid.map((block) => {
        if (block.gridIdentifier === oldGridIdentifier) {
          return {
            ...block,
            gridIdentifier: newGridIdentifier,
          };
        }

        return block;
      });
    }
  }

  get gridLayoutsOptions(): BasicSelectOption<Breakpoint>[] {
    const opts = Object.keys(this.gridLayouts).map((layout) => ({
      label: layout,
      value: layout as Breakpoint,
    }));

    return opts;
  }

  generateAreas(): GridLayout {
    const sm = generateGridAreasFromLayout(this.gridLayouts.sm);

    if (!sm) throw new Error("sm grid layout is null, this should not happen");

    return {
      sm,
      medium: generateGridAreasFromLayout(this.gridLayouts.medium),
      large: generateGridAreasFromLayout(this.gridLayouts.large),
      xl: generateGridAreasFromLayout(this.gridLayouts.xl),
    };
  }

  remove(idToRemove: string) {
    const key = this.activeGridLayoutKey;

    if (!this.gridLayouts[key]) return;

    this.gridLayouts[key]!.grid = this.gridLayouts[key]!.grid.filter(
      ({ id }) => id !== idToRemove
    );
  }

  duplicate(idToDuplicate: string) {
    const key = this.activeGridLayoutKey;
    const foundIndex =
      this.gridLayouts[key]?.grid.findIndex(({ id }) => id === idToDuplicate) ??
      -1;

    if (foundIndex === -1) return;

    if (!this.gridLayouts[key]) return;

    const itemToDuplicate = this.gridLayouts[key]!.grid[foundIndex];

    if (!itemToDuplicate) return;

    this.gridLayouts[key]!.grid.splice(foundIndex, 0, {
      id: crypto.randomUUID(),
      gridIdentifier: itemToDuplicate.gridIdentifier,
    });
  }

  setBlockIdToEdit(idToEdit: string | null) {
    if (!idToEdit) {
      this.pageStore.setBlockIdToEdit(null);
      return;
    }

    const key = this.activeGridLayoutKey;
    const foundIndex =
      this.gridLayouts[key]?.grid.findIndex(({ id }) => id === idToEdit) ?? -1;

    if (foundIndex === -1) return;

    if (!this.gridLayouts[key]) return;

    const { gridIdentifier } = this.gridLayouts[key]!.grid[foundIndex];

    const blockIdToEdit = this.pageStore.page.config.blocks.find(
      ({ props }) => props.gridIdentifier === gridIdentifier
    )?.id;

    if (!blockIdToEdit) return;

    this.pageStore.setBlockIdToEdit(blockIdToEdit);
  }

  add({
    gridIdentifier,
    id,
  }: NonNullable<DndGridLayout[Breakpoint]>["grid"][number]) {
    for (const layout of BREAKPOINTS) {
      const layoutGrid = this.gridLayouts[layout];
      if (!layoutGrid) continue;

      layoutGrid.grid.push({
        id,
        gridIdentifier,
      });
    }
  }
}
