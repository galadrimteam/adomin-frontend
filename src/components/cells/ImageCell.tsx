import { Box, IconButton } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import type { ModelData } from "../../pages/models/model.types";
import { getFileUrl } from "../../utils/getFileUrl";
import { ApiAttachment } from "../form/files/FileInput";

export const ImageCell: MRT_ColumnDef<ModelData>["Cell"] = ({ cell }) => {
  const fileData = cell.getValue() as ApiAttachment | null;
  const fileUrl = getFileUrl(fileData);

  if (!fileUrl) {
    return <Box>Aucune image</Box>;
  }

  return (
    <Box>
      <IconButton
        onClick={() => {
          window.open(fileUrl, "_blank");
        }}
      >
        <img src={fileUrl} style={{ maxHeight: 50 }} />
      </IconButton>
    </Box>
  );
};
