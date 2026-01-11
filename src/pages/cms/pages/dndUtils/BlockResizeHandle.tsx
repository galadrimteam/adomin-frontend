import { useDraggable } from "@dnd-kit/core";
import { Box } from "@mui/material";
import { FC } from "react";

interface Props {
  blockId: string;
  side: "left" | "right";
  gridIdentifier: string;
}

export const BlockResizeHandle: FC<Props> = ({
  blockId,
  side,
  gridIdentifier,
}) => {
  const resizeId = `resize-${blockId}-${side}`;

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: resizeId,
      data: {
        type: "resize",
        blockId,
        side,
        gridIdentifier,
      },
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <Box
      ref={setNodeRef}
      className="resize-handle"
      style={style}
      {...listeners}
      {...attributes}
      sx={{
        position: "absolute",
        [side]: 0,
        top: "50%",
        transform: "translateY(-50%)",
        height: "40px",
        width: "4px",
        cursor: "col-resize",
        zIndex: 20,
        opacity: isDragging ? 0.6 : 0,
        transition: isDragging ? "none" : "opacity 0.2s",
        backgroundColor: isDragging ? "primary.main" : "rgba(25, 118, 210, 0.3)",
        borderRadius: "2px",
        "&:hover": {
          opacity: 0.6,
          backgroundColor: "primary.main",
        },
      }}
    />
  );
};
