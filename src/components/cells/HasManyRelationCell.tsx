import { Alert, Box, Chip } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getModelPath } from "../../adominPaths";
import { useModelConfig } from "../../pages/models/ModelConfigContext";
import type { ModelData } from "../../pages/models/model.types";
import { getForeignKeyOptionLabel } from "../form/selects/foreignKey/getForeignKeyOptionLabel";

const DEFAULT_LINKS_LIMIT = 9;

export const HasManyRelationCell: MRT_ColumnDef<ModelData>["Cell"] = ({
  cell,
}) => {
  const [showAll, setShowAll] = useState(false);
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

  const valuesToShow = showAll ? values : values.slice(0, DEFAULT_LINKS_LIMIT);

  return (
    <Box>
      {valuesToShow.map(({ fkValue, label }) => (
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

      {showAll === false && valuesToShow.length !== values.length && (
        <Chip
          label={"+"}
          size="small"
          className="m-1"
          color="info"
          onClick={() => setShowAll(true)}
        />
      )}

      {showAll === true && valuesToShow.length > DEFAULT_LINKS_LIMIT && (
        <Chip
          label={"-"}
          size="small"
          className="m-1"
          color="info"
          onClick={() => setShowAll(false)}
        />
      )}
    </Box>
  );
};
