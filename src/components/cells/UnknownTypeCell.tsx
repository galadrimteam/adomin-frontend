import { Alert } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import type { ModelData } from "../../pages/models/model.types";

export const UnkownTypeCell: MRT_ColumnDef<ModelData>["Cell"] = () => {
  return <Alert severity="error">Unknown type</Alert>;
};
