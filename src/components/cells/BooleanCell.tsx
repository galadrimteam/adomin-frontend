import { Check, Close } from "@mui/icons-material";
import { Box } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";

export const BooleanCell: MRT_ColumnDef["Cell"] = ({ cell }) => {
  const value = cell.getValue();
  const booleanText = value === true ? <Check /> : <Close />;
  const color = value === true ? "green" : "red";

  return <Box sx={{ color }}>{booleanText}</Box>;
};
