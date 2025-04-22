import { Alert } from "@mui/material";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import { MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import { ModelData } from "../../pages/models/model.types";
import { useModelConfig } from "../../pages/models/ModelConfigContext";

type StringDateOrNull = string | null;
type DateOrNull = Date | null;

type StringDateRange = [string | null, string | null];
type DateRange = [Date | null, Date | null];

const getDateOrNull = (dateStrOrNull: string | null) => {
  if (!dateStrOrNull) return null;
  return new Date(dateStrOrNull);
};

const getFilterValue = (
  input: StringDateRange | StringDateOrNull
): DateRange | DateOrNull => {
  if (!Array.isArray(input)) return getDateOrNull(input);

  return [getDateOrNull(input[0]), getDateOrNull(input[1])];
};

export const DateCellFilter: MRT_ColumnDef<ModelData>["Filter"] = ({
  column,
  rangeFilterIndex,
}) => {
  const columnName = column.id;
  const modelConfig = useModelConfig();
  const field = useMemo(
    () => modelConfig.fields.find((field) => field.name === columnName),
    [modelConfig, columnName]
  );
  const isRangeFilter = rangeFilterIndex !== undefined;
  const defaultValue = isRangeFilter ? ([null, null] as StringDateRange) : null;
  const columnValue = column.getFilterValue() as
    | StringDateRange
    | StringDateOrNull
    | undefined;
  const filterValue = getFilterValue(columnValue ?? defaultValue);

  if (!field || field.adomin.type !== "date") {
    return <Alert severity="error">Erreur lors du chargement du filtre</Alert>;
  }

  const filterVariant =
    field.adomin.filterVariant ?? `${field.adomin.subType}-range`;
  const DatePickerComponent =
    filterVariant === "date-range" ? DatePicker : DateTimePicker;

  const datePickerDefaultValue = Array.isArray(filterValue)
    ? filterValue[rangeFilterIndex ?? 0]
    : filterValue;

  const handleChange = (value: DateOrNull) => {
    if (!Array.isArray(filterValue)) {
      column.setFilterValue(value);
      return;
    }

    const newRange = [...filterValue];

    newRange[rangeFilterIndex ?? 0] = value;

    column.setFilterValue(newRange);
  };

  return (
    <DatePickerComponent
      defaultValue={datePickerDefaultValue}
      onChange={handleChange}
      slotProps={{
        field: {
          clearable: true,
          onClear: () => {
            handleChange(null);
          },
        },
        textField: {
          variant: "standard",
          placeholder: `Filtrer par ${field.adomin.label ?? field.name}`,
        },
      }}
    />
  );
};
