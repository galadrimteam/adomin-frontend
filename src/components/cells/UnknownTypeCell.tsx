import { Alert } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";

export const UnkownTypeCell: MRT_ColumnDef["Cell"] = () => {
  return <Alert severity="error">Unknown type</Alert>;
};
