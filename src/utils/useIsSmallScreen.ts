import { useMediaQuery } from "@mui/material";

export const SMALL_SCREEN_WIDTH = 900;

export const useIsSmallScreen = () => {
  const isSmallScreen = useMediaQuery(`(max-width:${SMALL_SCREEN_WIDTH}px)`);

  return isSmallScreen;
};
