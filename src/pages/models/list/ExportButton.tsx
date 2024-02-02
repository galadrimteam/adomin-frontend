import { Download } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { UseMutationResult } from "@tanstack/react-query";
import { useState } from "react";
import { ExportDialog, ExportFileType } from "./ExportDialog";

interface ExportButtonProps {
  mutation: UseMutationResult<unknown, Error, ExportFileType, unknown>;
}

export const ExportButton = ({ mutation }: ExportButtonProps) => {
  const [exportTypeChoiceOpen, setExportTypeChoiceOpen] = useState(false);

  const handleExport = (type: ExportFileType) => {
    mutation.mutateAsync(type).then(() => setExportTypeChoiceOpen(false));
  };

  return (
    <>
      <Tooltip arrow title="Exporter">
        <IconButton onClick={() => setExportTypeChoiceOpen(true)}>
          <Download />
        </IconButton>
      </Tooltip>
      <ExportDialog
        handleExport={handleExport}
        open={exportTypeChoiceOpen}
        setOpen={setExportTypeChoiceOpen}
        isLoading={mutation.isPending}
      />
    </>
  );
};
