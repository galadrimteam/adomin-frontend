import { Clear } from "@mui/icons-material";
import { Alert, Box } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import { Link } from "react-router-dom";
import { getModelPath } from "../../adominPaths";
import { useModelConfig } from "../../pages/models/ModelConfigContext";
import type { ModelData } from "../../pages/models/model.types";
import { getForeignKeyOptionLabel } from "../form/selects/foreignKey/getForeignKeyOptionLabel";

export const HasOneRelationCell: MRT_ColumnDef<ModelData>["Cell"] = ({
  cell,
}) => {
  const columnName = cell.getContext().column.id;
  const cellValue = cell.getValue() as ModelData;
  const modelConfig = useModelConfig();
  const field = modelConfig.fields.find((field) => field.name === columnName);

  if (!field || field.adomin.type !== "hasOneRelation") {
    return <Alert severity="error">Erreur lors du chargement du champ</Alert>;
  }

  const localKey = field.adomin.localKeyName ?? "id";
  const labelFields = field.adomin.labelFields;
  const labelFieldsSeparator = field.adomin.labelFieldsSeparator;
  const modelName = field.adomin.modelName;

  if (!cellValue) {
    return <Clear />;
  }
  const fkValue = cellValue[localKey];
  const label = getForeignKeyOptionLabel(
    cellValue,
    labelFields,
    labelFieldsSeparator
  );

  const updatePath = getModelPath({
    name: modelName,
    type: "update",
    primaryKeyValue: fkValue,
  });

  return (
    <Box>
      <Link key={fkValue} to={updatePath}>
        {label}
      </Link>
    </Box>
  );
};
