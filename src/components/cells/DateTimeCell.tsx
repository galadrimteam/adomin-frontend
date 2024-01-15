import { Box } from "@mui/material";
import { format } from "date-fns";
import { MRT_ColumnDef } from "material-react-table";
import type { ModelData } from "../../pages/models/model.types";

const getDateTimeText = (date: unknown) => {
  if (!date) return "";
  if (typeof date !== "string") return "";

  const dateObject = new Date(date);

  // format date with date-fns
  return format(dateObject, "dd/MM/yyyy HH:mm");
};

export const DateTimeCell: MRT_ColumnDef<ModelData>["Cell"] = ({ cell }) => {
  const date = cell.getValue();
  const dateText = getDateTimeText(date);

  return <Box>{dateText}</Box>;
};
