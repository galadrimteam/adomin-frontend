import { Clear } from "@mui/icons-material";
import { Alert, Box, Button, CircularProgress } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useModelConfig } from "../../pages/models/ModelConfigContext";
import type { ModelData } from "../../pages/models/model.types";
import { useShowModelQuery } from "../../pages/models/update/useShowModelQuery";
import { getForeignKeyOptionLabel } from "../form/selects/foreignKey/getForeignKeyOptionLabel";

export const ForeignKeyCellWithLabel: MRT_ColumnDef<ModelData>["Cell"] = ({
  cell,
}) => {
  const columnName = cell.getContext().column.id;
  const cellValue = cell.getValue() as number | null;
  const modelConfig = useModelConfig();
  const field = modelConfig.fields.find((field) => field.name === columnName);
  const foreignModelName =
    field?.adomin.type === "foreignKey" ? field.adomin.modelName : "";
  const foreignKeyValue = foreignModelName === "" ? null : cellValue;

  const modelDataQuery = useShowModelQuery(foreignModelName, foreignKeyValue);

  const label = useMemo(() => {
    if (!modelDataQuery.data || field?.adomin.type !== "foreignKey")
      return null;

    return getForeignKeyOptionLabel(
      modelDataQuery.data,
      field.adomin.labelFields,
      field.adomin.labelFieldsSeparator
    );
  }, [field, modelDataQuery.data]);

  if (modelDataQuery.isLoading) {
    return (
      <div className="flex justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (!field || field.adomin.type !== "foreignKey") {
    return <Alert severity="error">Erreur lors du chargement du champ</Alert>;
  }

  if (cellValue === null) return <Clear />;

  return (
    <Box>
      <Link to={`/adomin/models/${field.adomin.modelName}/${cellValue}`}>
        <Button>{label}</Button>
      </Link>
    </Box>
  );
};
