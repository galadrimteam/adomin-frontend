import { Box, IconButton } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import { ApiAttachment } from "../form/files/FileInput";

export const ImageCell: MRT_ColumnDef["Cell"] = ({ cell }) => {
  const fileData = cell.getValue() as ApiAttachment | null;

  if (!fileData) {
    return <Box>Aucune image</Box>;
  }

  return (
    <Box>
      <IconButton
        onClick={() => {
          window.open(fileData.url, "_blank");
        }}
      >
        <img alt={fileData.name} src={fileData.url} style={{ maxHeight: 50 }} />
      </IconButton>
    </Box>
  );
};
