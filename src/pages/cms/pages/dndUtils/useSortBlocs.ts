import {
  DragEndEvent,
  DragMoveEvent,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useCallback, useRef } from "react";
import { CmsPageStore } from "../CmsPageStore";

export const useSortBlocs = ({ store }: { store: CmsPageStore }) => {
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const resizeStartSizeRef = useRef<number | null>(null);
  const resizeBlockIdRef = useRef<string | null>(null);
  const resizeSideRef = useRef<"left" | "right" | null>(null);
  const resizeGridIdentifierRef = useRef<string | null>(null);
  const lastResizeUpdateRef = useRef<number | null>(null);

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const activeData = event.active.data.current;
      
      if (activeData?.type === "resize") {
        // Handle resize drag start
        resizeBlockIdRef.current = activeData.blockId;
        resizeSideRef.current = activeData.side;
        resizeGridIdentifierRef.current = activeData.gridIdentifier;
        
        // Get current size of the block
        const layout = store.gridStore.activeGridLayout;
        if (layout) {
          resizeStartSizeRef.current = layout.grid.filter(
            (item) => item.gridIdentifier === activeData.gridIdentifier
          ).length;
          lastResizeUpdateRef.current = resizeStartSizeRef.current;
        }
      } else {
        // Handle block drag start
        store.gridStore.setActiveId(event.active.id.toString());
      }
    },
    [store]
  );

  const handleDragMove = useCallback(
    (event: DragMoveEvent) => {
      const activeData = event.active.data.current;
      
      // Only handle resize drags
      if (activeData?.type !== "resize") {
        return;
      }

      if (
        !resizeBlockIdRef.current ||
        !resizeSideRef.current ||
        !resizeGridIdentifierRef.current ||
        resizeStartSizeRef.current === null
      ) {
        return;
      }

      const delta = event.delta.x;
      if (delta === 0) return;

      // Find the grid container to calculate column width
      // Look for the DndGrid element
      const gridElement = document.querySelector('[style*="display: grid"][style*="grid-template-columns"]') as HTMLElement;
      if (!gridElement) return;

      const gridRect = gridElement.getBoundingClientRect();
      const gridWidth = gridRect.width;
      const columns = store.gridStore.activeColumns;
      const columnWidth = gridWidth / columns;

      const deltaColumns = Math.round(delta / columnWidth);
      const targetSize = Math.max(
        1,
        resizeStartSizeRef.current + (resizeSideRef.current === "right" ? deltaColumns : -deltaColumns)
      );

      // Only update if there's a meaningful change
      if (
        targetSize !== lastResizeUpdateRef.current &&
        Math.abs(targetSize - (lastResizeUpdateRef.current ?? resizeStartSizeRef.current)) >= 1
      ) {
        const currentSize = store.gridStore.activeGridLayout?.grid.filter(
          (item) => item.gridIdentifier === resizeGridIdentifierRef.current
        ).length ?? 1;

        const difference = targetSize - currentSize;
        lastResizeUpdateRef.current = targetSize;

        if (difference > 0) {
          // Add more grid items (make block bigger)
          const layout = store.gridStore.activeGridLayout;
          if (layout) {
            const itemsWithIdentifier = layout.grid.filter(
              (item) => item.gridIdentifier === resizeGridIdentifierRef.current
            );

            const itemToDuplicate =
              resizeSideRef.current === "right"
                ? itemsWithIdentifier[itemsWithIdentifier.length - 1]
                : itemsWithIdentifier[0];

            if (itemToDuplicate) {
              for (let i = 0; i < difference; i++) {
                store.gridStore.duplicate(itemToDuplicate.id);
              }
            }
          }
        } else if (difference < 0) {
          // Remove grid items (make block smaller)
          const itemsToRemove = Math.abs(difference);
          const layout = store.gridStore.activeGridLayout;
          if (layout) {
            const itemsWithIdentifier = layout.grid
              .map((item, index) => ({ item, index }))
              .filter(({ item }) => item.gridIdentifier === resizeGridIdentifierRef.current);

            // Remove from the appropriate side
            const itemsToDelete =
              resizeSideRef.current === "right"
                ? itemsWithIdentifier.slice(-itemsToRemove)
                : itemsWithIdentifier.slice(0, itemsToRemove);

            itemsToDelete.forEach(({ item }) => {
              store.gridStore.remove(item.id);
            });
          }
        }
      }
    },
    [store]
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const activeData = event.active.data.current;

      if (activeData?.type === "resize") {
        // Reset resize state
        resizeStartSizeRef.current = null;
        resizeBlockIdRef.current = null;
        resizeSideRef.current = null;
        resizeGridIdentifierRef.current = null;
        lastResizeUpdateRef.current = null;
      } else {
        // Handle block drag end
        const { active, over } = event;

        if (active.id !== over?.id && over?.id) {
          store.gridStore.orderLayout(active.id.toString(), over.id.toString());
        }

        store.gridStore.setActiveId(null);
      }
    },
    [store]
  );

  const handleDragCancel = useCallback(() => {
    // Reset all state
    resizeStartSizeRef.current = null;
    resizeBlockIdRef.current = null;
    resizeSideRef.current = null;
    resizeGridIdentifierRef.current = null;
    lastResizeUpdateRef.current = null;
    store.gridStore.setActiveId(null);
  }, [store]);

  return {
    sensors,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    handleDragCancel,
  };
};
