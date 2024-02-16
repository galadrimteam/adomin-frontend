import { Alert, Box, Chip } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import { Link } from "react-router-dom";
import { useModelConfig } from "../../pages/models/ModelConfigContext";
import type { ModelData } from "../../pages/models/model.types";
import { getForeignKeyOptionLabel } from "../form/selects/foreignKey/getForeignKeyOptionLabel";

export const HasManyRelationCell: MRT_ColumnDef<ModelData>["Cell"] = ({
  cell,
}) => {
  const columnName = cell.getContext().column.id;
  const cellValue = cell.getValue() as ModelData[];
  const modelConfig = useModelConfig();
  const field = modelConfig.fields.find((field) => field.name === columnName);

  if (!field || field.adomin.type !== "hasManyRelation") {
    return <Alert severity="error">Erreur lors du chargement du champ</Alert>;
  }

  const localKey = field.adomin.localKeyName ?? "id";
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
        <Link key={fkValue} to={`/adomin/${modelName}/${fkValue}`}>
          <Chip label={label} size="small" className="m-1" />
        </Link>
      ))}
    </Box>
  );
};
