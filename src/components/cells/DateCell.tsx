import { Box } from "@mui/material";
import { format } from "date-fns";
import { MRT_ColumnDef } from "material-react-table";

const getDateText = (date: unknown) => {
  if (!date) return "";
  if (typeof date !== "string") return "";

  const dateObject = new Date(date);

  // format date with date-fns
  return format(dateObject, "dd/MM/yyyy");
};

export const DateCell: MRT_ColumnDef["Cell"] = ({ cell }) => {
  const date = cell.getValue();
  const dateText = getDateText(date);

  return <Box>{dateText}</Box>;
};
