import { Alert, Box } from "@mui/material";
import { format } from "date-fns";
import { MRT_ColumnDef } from "material-react-table";
import { AdominDateFieldConfig } from "../../pages/models/fields.types";
import type { ModelData } from "../../pages/models/model.types";
import { useModelConfig } from "../../pages/models/ModelConfigContext";

const getDateTimeText = (
  date: unknown,
  type: AdominDateFieldConfig["subType"]
) => {
  if (!date) return "";
  if (typeof date !== "string") return "";

  const dateObject = new Date(date);

  if (type === "datetime") {
    return format(dateObject, "dd/MM/yyyy HH:mm:ss");
  }

  return format(dateObject, "dd/MM/yyyy");
};

export const DateTimeCell: MRT_ColumnDef<ModelData>["Cell"] = ({ cell }) => {
  const date = cell.getValue();
  const columnName = cell.getContext().column.id;
  const modelConfig = useModelConfig();
  const field = modelConfig.fields.find((field) => field.name === columnName);

  if (!field || field.adomin.type !== "date") {
    return <Alert severity="error">Erreur lors du chargement du champ</Alert>;
  }

  const dateText = getDateTimeText(date, field.adomin.subType);

  return <Box>{dateText}</Box>;
};
