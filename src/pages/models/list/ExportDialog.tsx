import { LoadingButton } from "@mui/lab";
import { ButtonGroup, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useState } from "react";

export type ExportFileType = "xlsx" | "csv" | "json";

interface Props {
  open: boolean;
  setOpen: (state: boolean) => void;
  handleExport: (type: ExportFileType) => void;
  isLoading: boolean;
}

export const ExportDialog = ({
  open,
  setOpen,
  handleExport,
  isLoading,
}: Props) => {
  const [mode, setMode] = useState<ExportFileType>("csv");

  const handleClick = (type: ExportFileType) => {
    handleExport(type);
    setMode(type);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Choisissez le format d'export</DialogTitle>

      <DialogActions sx={{ p: 4 }}>
        <ButtonGroup size="large">
          <LoadingButton
            loading={isLoading && mode === "csv"}
            onClick={() => handleClick("csv")}
            color="primary"
            autoFocus
          >
            CSV
          </LoadingButton>
          <LoadingButton
            loading={isLoading && mode === "xlsx"}
            onClick={() => handleClick("xlsx")}
            color="secondary"
          >
            XLSX (excel)
          </LoadingButton>
          <LoadingButton
            loading={isLoading && mode === "json"}
            onClick={() => handleClick("json")}
            color="primary"
          >
            JSON
          </LoadingButton>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
};
