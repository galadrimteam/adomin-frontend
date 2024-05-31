import { Clear } from "@mui/icons-material";
import { Alert, Box, Button } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { getModelPath } from "../../adominPaths";
import { useModelConfig } from "../../pages/models/ModelConfigContext";
import type { ModelData } from "../../pages/models/model.types";
import { getForeignKeyOptionLabel } from "../form/selects/foreignKey/getForeignKeyOptionLabel";

export const BelongsToRelationCell: MRT_ColumnDef<ModelData>["Cell"] = ({
  cell,
}) => {
  const columnName = cell.getContext().column.id;
  const cellValue = cell.getValue() as ModelData | null;
  const modelConfig = useModelConfig();
  const field = modelConfig.fields.find((field) => field.name === columnName);

  const relation = useMemo(() => {
    if (!field || field?.adomin.type !== "belongsToRelation" || !cellValue) {
      return null;
    }

    const label = getForeignKeyOptionLabel(
      cellValue,
      field.adomin.labelFields,
      field.adomin.labelFieldsSeparator
    );

    const fkValue = cellValue[field.adomin.localKeyName ?? "id"];

    return { label, fkValue };
  }, [cellValue, field]);

  if (!field || field.adomin.type !== "belongsToRelation") {
    return <Alert severity="error">Erreur lors du chargement du champ</Alert>;
  }

  if (relation === null) return <Clear />;

  const updatePath = getModelPath({
    name: field.adomin.modelName,
    type: "update",
    primaryKeyValue: relation.fkValue,
  });

  return (
    <Box>
      <Link to={updatePath}>
        <Button>{relation.label}</Button>
      </Link>
    </Box>
  );
};
