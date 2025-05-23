import { MRT_ColumnDef } from "material-react-table";
import { BelongsToRelationCell } from "../../components/cells/BelongsToRelationCell";
import { BitsetCell } from "../../components/cells/BitsetCell";
import { BooleanCell } from "../../components/cells/BooleanCell";
import { DateCell } from "../../components/cells/DateCell";
import { DateTimeCell } from "../../components/cells/DateTimeCell";
import { FileCell } from "../../components/cells/FileCell";
import { ForeignKeyCell } from "../../components/cells/ForeignKeyCell";
import { ForeignKeyCellWithLabel } from "../../components/cells/ForeignKeyCellWithLabel";
import { HasManyRelationCell } from "../../components/cells/HasManyRelationCell";
import { HasOneRelationCell } from "../../components/cells/HasOneRelationCell";
import { ImageCell } from "../../components/cells/ImageCell";
import { JsonCell } from "../../components/cells/JsonCell";
import { ManyToManyRelationCell } from "../../components/cells/ManyToManyRelationCell";
import { SelectArrayCell } from "../../components/cells/SelectArrayCell";
import { StringArrayCell } from "../../components/cells/StringArrayCell";
import { UnkownTypeCell } from "../../components/cells/UnknownTypeCell";
import { DateCellFilter } from "../../components/filters/DateCellFilter";
import { ForeignKeyCellFilter } from "../../components/filters/ForeignKeyCellFilter";
import { getBitsetFilterOptions } from "../../utils/bitsetHelpers";
import { ModelData, ModelField } from "./model.types";

interface ValidationErrors {
  [cellId: string]: string;
}

const getMuiEditTextFieldProps = (
  validationErrors: ValidationErrors,
  type?: string
): MRT_ColumnDef<ModelData>["muiEditTextFieldProps"] => {
  return ({ cell }) => ({
    error: !!validationErrors[cell.id],
    helperText: validationErrors[cell.id],
    type,
  });
};

export const getColumn = (
  field: ModelField,
  validationErrors: ValidationErrors
): MRT_ColumnDef<ModelData> => {
  const baseColumn = {
    accessorKey: field.name,
    header: field.adomin.label ?? field.name,
    size: field.adomin.size ?? 120,
    enableColumnFilter: field.adomin.filterable,
    enableSorting: field.adomin.sortable,
  };

  if (
    field.adomin.type === "number" &&
    field.adomin.variant?.type === "bitset"
  ) {
    return {
      ...baseColumn,
      muiEditTextFieldProps: getMuiEditTextFieldProps(validationErrors),
      Cell: BitsetCell,
      filterVariant: "select",
      filterSelectOptions: getBitsetFilterOptions(
        field.adomin.variant.bitsetValues,
        field.adomin.variant.bitsetLabels
      ),
    };
  }

  if (field.adomin.type === "number") {
    return {
      ...baseColumn,
      muiEditTextFieldProps: getMuiEditTextFieldProps(
        validationErrors,
        "number"
      ),
      accessorFn: (row) => generateDisplayValue(row, field),
    };
  }

  if (field.adomin.type === "string") {
    return {
      ...baseColumn,
      muiEditTextFieldProps: getMuiEditTextFieldProps(validationErrors, "text"),
      accessorFn: (row) => generateDisplayValue(row, field),
    };
  }

  if (field.adomin.type === "enum") {
    return {
      ...baseColumn,
      filterVariant: "select",
      filterSelectOptions: field.adomin.options,
      muiEditTextFieldProps: getMuiEditTextFieldProps(validationErrors, "text"),
    };
  }

  if (field.adomin.type === "date") {
    const filterVariant = field.adomin.filterVariant ?? `${field.adomin.subType}-range`;

    return {
      ...baseColumn,
      filterVariant,
      muiEditTextFieldProps: getMuiEditTextFieldProps(validationErrors),
      Cell: field.adomin.subType === 'date' ? DateCell : DateTimeCell,
      Filter: DateCellFilter,
    };
  }

  if (field.adomin.type === "boolean") {
    return {
      ...baseColumn,
      filterVariant: "checkbox",
      muiEditTextFieldProps: getMuiEditTextFieldProps(validationErrors),
      Cell: BooleanCell,
    };
  }

  if (field.adomin.type === "file" && field.adomin.isImage) {
    return {
      ...baseColumn,
      muiEditTextFieldProps: getMuiEditTextFieldProps(validationErrors),
      Cell: ImageCell,
    };
  }

  if (field.adomin.type === "file") {
    return {
      ...baseColumn,
      muiEditTextFieldProps: getMuiEditTextFieldProps(validationErrors),
      Cell: FileCell,
    };
  }

  if (field.adomin.type === "json") {
    return {
      ...baseColumn,
      muiEditTextFieldProps: getMuiEditTextFieldProps(validationErrors),
      Cell: JsonCell,
    };
  }

  if (field.adomin.type === "array" && field.adomin.options) {
    return {
      ...baseColumn,
      muiEditTextFieldProps: getMuiEditTextFieldProps(validationErrors),
      Cell: SelectArrayCell,
    };
  }

  if (field.adomin.type === "array") {
    return {
      ...baseColumn,
      muiEditTextFieldProps: getMuiEditTextFieldProps(validationErrors),
      Cell: StringArrayCell,
    };
  }

  if (field.adomin.type === "hasManyRelation") {
    return {
      ...baseColumn,
      muiEditTextFieldProps: getMuiEditTextFieldProps(validationErrors),
      Cell: HasManyRelationCell,
    };
  }

  if (field.adomin.type === "manyToManyRelation") {
    return {
      ...baseColumn,
      muiEditTextFieldProps: getMuiEditTextFieldProps(validationErrors),
      Cell: ManyToManyRelationCell,
    };
  }

  if (field.adomin.type === "hasOneRelation") {
    return {
      ...baseColumn,
      muiEditTextFieldProps: getMuiEditTextFieldProps(validationErrors),
      Cell: HasOneRelationCell,
    };
  }

  if (field.adomin.type === "belongsToRelation") {
    return {
      ...baseColumn,
      muiEditTextFieldProps: getMuiEditTextFieldProps(validationErrors),
      Cell: BelongsToRelationCell,
      Filter: ForeignKeyCellFilter,
    };
  }

  if (field.adomin.type === "foreignKey") {
    return {
      ...baseColumn,
      muiEditTextFieldProps: getMuiEditTextFieldProps(validationErrors),
      Cell: field.adomin.showLabelInTable
        ? ForeignKeyCellWithLabel
        : ForeignKeyCell,
      Filter: ForeignKeyCellFilter,
    };
  }

  return {
    ...baseColumn,
    muiEditTextFieldProps: getMuiEditTextFieldProps(validationErrors),
    Cell: UnkownTypeCell,
  };
};

function generateDisplayValue(row: ModelData, field: ModelField) {
  const value = row[field.name];

  if (field.adomin.type !== "number" && field.adomin.type !== "string") {
    return value;
  }

  if (!field.adomin.valueDisplayTemplate) return value;

  const templateWithValue = field.adomin.valueDisplayTemplate.replace(
    /\{\{\s*value\s*\}\}/,
    `${value}`
  );

  return templateWithValue;
}
