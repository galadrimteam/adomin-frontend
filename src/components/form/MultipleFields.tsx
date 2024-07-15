import { Box } from "@mui/material";
import { PropsWithChildren, useMemo } from "react";
import { useIsSmallScreen } from "../../utils/useIsSmallScreen";

export type MultipleFieldsProps = PropsWithChildren<{
  numberOfFieldsPerLine: number;
  my?: number;
  mt?: number;
  mb?: number;
}>;

export function MultipleFields({
  numberOfFieldsPerLine,
  children,
  my,
  mt,
  mb,
}: MultipleFieldsProps) {
  const isSmallScreen = useIsSmallScreen();

  const perLine = useMemo(() => {
    if (isSmallScreen) return 1;
    return numberOfFieldsPerLine;
  }, [isSmallScreen, numberOfFieldsPerLine]);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: `repeat(${perLine}, 1fr)`,
        gap: 2,
        my,
        mt,
        mb,
      }}
    >
      {children}
    </Box>
  );
}

type DoubleFieldsProps = Omit<MultipleFieldsProps, "numberOfFieldsPerLine">;

export const DoubleFields = (props: DoubleFieldsProps) => (
  <MultipleFields {...props} numberOfFieldsPerLine={2} />
);
