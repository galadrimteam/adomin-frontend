import { Alert, Box, Chip } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import { Link } from "react-router-dom";
import { getModelPath } from "../../adominPaths";
import { useModelConfig } from "../../pages/models/ModelConfigContext";
import type { ModelData } from "../../pages/models/model.types";
import { getForeignKeyOptionLabel } from "../form/selects/foreignKey/getForeignKeyOptionLabel";

export const ManyToManyRelationCell: MRT_ColumnDef<ModelData>["Cell"] = ({
  cell,
}) => {
  const columnName = cell.getContext().column.id;
  const cellValue = cell.getValue() as ModelData[];
  const modelConfig = useModelConfig();
  const field = modelConfig.fields.find((field) => field.name === columnName);

  if (!field || field.adomin.type !== "manyToManyRelation") {
    return <Alert severity="error">Erreur lors du chargement du champ</Alert>;
  }

  const localKey = field.adomin.relatedKeyName ?? "id";
  const labelFields = field.adomin.labelFields;
  const labelFieldsSeparator = field.adomin.labelFieldsSeparator;
  const modelName = field.adomin.modelName;

  const values = cellValue.map((v) => ({
    fkValue: v[localKey],
    label: getForeignKeyOptionLabel(v, labelFields, labelFieldsSeparator),
  }));

  return (
    <Box>
      {values.map(({ fkValue, label }) => (
        <Link
          key={fkValue}
          to={getModelPath({
            name: modelName,
            type: "update",
            primaryKeyValue: fkValue,
          })}
        >
          <Chip label={label} size="small" className="m-1" />
        </Link>
      ))}
    </Box>
  );
};
