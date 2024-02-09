import { Clear } from "@mui/icons-material";
import { Alert, Box, Chip } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import { useModelConfig } from "../../pages/models/ModelConfigContext";
import type { ModelData } from "../../pages/models/model.types";
import { getBitsetRolesLabels } from "../../utils/bitsetHelpers";

export const BitsetCell: MRT_ColumnDef<ModelData>["Cell"] = ({ cell }) => {
  const columnName = cell.getContext().column.id;
  const cellValue = cell.getValue() as number | null;
  const modelConfig = useModelConfig();
  const field = modelConfig.fields.find((field) => field.name === columnName);

  if (
    !field ||
    field.adomin.type !== "number" ||
    field.adomin.variant?.type !== "bitset"
  ) {
    return <Alert severity="error">Erreur lors du chargement du champ</Alert>;
  }

  if (cellValue === null) return <Clear />;

  const { bitsetValues, bitsetLabels } = field.adomin.variant;
  const roles = getBitsetRolesLabels(bitsetValues, cellValue, bitsetLabels);

  return (
    <Box>
      {roles.map((r) => (
        <Chip key={r} label={r} size="small" className="m-1" />
      ))}
    </Box>
  );
};
