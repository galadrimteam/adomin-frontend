import { Download } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import type { ModelData } from "../../pages/models/model.types";
import { getFileUrl } from "../../utils/getFileUrl";
import { ApiAttachment } from "../form/files/FileInput";

export const FileCell: MRT_ColumnDef<ModelData>["Cell"] = ({ cell }) => {
  const fileData = cell.getValue() as ApiAttachment | null;
  const fileUrl = getFileUrl(fileData);

  if (!fileUrl) {
    return <Box>Aucun fichier</Box>;
  }

  return (
    <Box>
      <IconButton
        color="primary"
        onClick={() => {
          window.open(fileUrl, "_blank");
        }}
      >
        <Download />
      </IconButton>
    </Box>
  );
};
