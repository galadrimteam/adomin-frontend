import {
  DragEndEvent,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useCallback } from "react";
import { CmsPageStore } from "../CmsPageStore";

export const useSortBlocs = ({ store }: { store: CmsPageStore }) => {
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      store.gridStore.setActiveId(event.active.id.toString());
    },
    [store]
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (active.id !== over?.id && over?.id) {
        store.gridStore.orderLayout(active.id.toString(), over.id.toString());
      }

      store.gridStore.setActiveId(null);
    },
    [store]
  );
  const handleDragCancel = useCallback(() => {
    store.gridStore.setActiveId(null);
  }, [store]);

  return {
    sensors,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  };
};
