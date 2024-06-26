import { Clear } from "@mui/icons-material";
import { Alert, Box, Button } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import { Link } from "react-router-dom";
import { getModelPath } from "../../adominPaths";
import { useModelConfig } from "../../pages/models/ModelConfigContext";
import type { ModelData } from "../../pages/models/model.types";

export const ForeignKeyCell: MRT_ColumnDef<ModelData>["Cell"] = ({ cell }) => {
  const columnName = cell.getContext().column.id;
  const cellValue = cell.getValue() as number | null;
  const modelConfig = useModelConfig();
  const field = modelConfig.fields.find((field) => field.name === columnName);

  if (!field || field.adomin.type !== "foreignKey") {
    return <Alert severity="error">Erreur lors du chargement du champ</Alert>;
  }

  if (cellValue === null) return <Clear />;

  const updatePath = getModelPath({
    name: field.adomin.modelName,
    type: "update",
    primaryKeyValue: cellValue,
  });

  return (
    <Box>
      <Link to={updatePath}>
        <Button>Aller voir</Button>
      </Link>
    </Box>
  );
};
