import { Box } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import type { ModelData } from "../../pages/models/model.types";

export const StringArrayCell: MRT_ColumnDef<ModelData>["Cell"] = ({ cell }) => {
  const cellValue = cell.getValue();
  const stringArray = Array.isArray(cellValue) ? cellValue : [];
  const valueToShow = stringArray.join(", ");

  return <Box>{valueToShow}</Box>;
};
