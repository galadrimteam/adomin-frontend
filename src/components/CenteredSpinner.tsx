import { CircularProgress } from "@mui/material";

export const CenteredSpinner = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <CircularProgress />
    </div>
  );
};
