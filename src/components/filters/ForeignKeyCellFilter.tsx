import { Alert } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useModelConfig } from "../../pages/models/ModelConfigContext";
import { ModelData } from "../../pages/models/model.types";
import { ForeignKeySelectRhf } from "../form/selects/foreignKey/ForeignKeySelectRhf";

export const ForeignKeyCellFilter: MRT_ColumnDef<ModelData>["Filter"] = ({
  column,
}) => {
  const columnName = column.id;
  const modelConfig = useModelConfig();
  const field = useMemo(
    () => modelConfig.fields.find((field) => field.name === columnName),
    [modelConfig, columnName]
  );
  const { control } = useForm({
    defaultValues: {
      filter: null,
    },
  });

  const afterChange = useCallback(
    (newValue: string | null) => {
      column.setFilterValue(newValue);
    },
    [column]
  );

  const placeholder = useMemo(() => {
    if (
      !field ||
      !(
        field.adomin.type === "foreignKey" ||
        field.adomin.type === "belongsToRelation"
      )
    )
      return undefined;

    const label = field.adomin.label ?? field.name;

    return `Filtrer par ${label}`;
  }, [field]);

  if (
    !field ||
    !(
      field.adomin.type === "foreignKey" ||
      field.adomin.type === "belongsToRelation"
    )
  ) {
    return <Alert severity="error">Erreur lors du chargement du filtre</Alert>;
  }

  return (
    <div style={{ marginTop: 3 }}>
      <ForeignKeySelectRhf
        autocompleteVariant="standard"
        autocompleteSize="small"
        labelFields={field.adomin.labelFields}
        modelName={field.adomin.modelName}
        separator={field.adomin.labelFieldsSeparator}
        control={control}
        name="filter"
        afterChange={afterChange}
        autocompletePlaceholder={placeholder}
      />
    </div>
  );
};
