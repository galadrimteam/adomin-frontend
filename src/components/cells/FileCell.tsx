import { Download } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import type { ModelData } from "../../pages/models/model.types";
import { ApiAttachment } from "../form/files/FileInput";

export const FileCell: MRT_ColumnDef<ModelData>["Cell"] = ({ cell }) => {
  const fileData = cell.getValue() as ApiAttachment | null;

  if (!fileData) {
    return <Box>Aucun fichier</Box>;
  }

  return (
    <Box>
      <IconButton
        color="primary"
        onClick={() => {
          window.open(fileData.url, "_blank");
        }}
      >
        <Download />
      </IconButton>
    </Box>
  );
};
