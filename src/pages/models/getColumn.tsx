import { MRT_ColumnDef } from "material-react-table";
import { BooleanCell } from "../../components/cells/BooleanCell";
import { DateCell } from "../../components/cells/DateCell";
import { FileCell } from "../../components/cells/FileCell";
import { ForeignKeyCell } from "../../components/cells/ForeignKeyCell";
import { ForeignKeyCellWithLabel } from "../../components/cells/ForeignKeyCellWithLabel";
import { ImageCell } from "../../components/cells/ImageCell";
import { StringArrayCell } from "../../components/cells/StringArrayCell";
import { UnkownTypeCell } from "../../components/cells/UnknownTypeCell";
import { ForeignKeyCellFilter } from "../../components/filters/ForeignKeyCellFilter";
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
  };

  if (field.adomin.type === "number") {
    return {
      ...baseColumn,
      muiEditTextFieldProps: getMuiEditTextFieldProps(
        validationErrors,
        "number"
      ),
    };
  }

  if (field.adomin.type === "string") {
    return {
      ...baseColumn,
      muiEditTextFieldProps: getMuiEditTextFieldProps(validationErrors, "text"),
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
    return {
      ...baseColumn,
      filterVariant: "date",
      muiEditTextFieldProps: getMuiEditTextFieldProps(validationErrors),
      Cell: DateCell,
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

  if (field.adomin.type === "array") {
    return {
      ...baseColumn,
      muiEditTextFieldProps: getMuiEditTextFieldProps(validationErrors),
      Cell: StringArrayCell,
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
