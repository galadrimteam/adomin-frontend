import { Box } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import { ApiAttachment } from "../form/files/FileInput";

export const FileCell: MRT_ColumnDef["Cell"] = ({ cell }) => {
  const fileData = cell.getValue() as ApiAttachment | null;

  if (!fileData) {
    return <Box>Aucun fichier</Box>;
  }

  return (
    <Box>
      <a href={fileData.url}>{fileData.name}</a>
    </Box>
  );
};
