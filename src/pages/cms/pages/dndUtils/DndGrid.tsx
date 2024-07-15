import { PropsWithChildren } from "react";

type DndGridProps = {
  columns: number;
};

export const DndGrid = ({
  children,
  columns,
}: PropsWithChildren<DndGridProps>) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridGap: 10,
        maxWidth: "800px",
        margin: "100px auto",
      }}
    >
      {children}
    </div>
  );
};
