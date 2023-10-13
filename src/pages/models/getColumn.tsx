import { MRT_ColumnDef } from "material-react-table";
import { DateCell } from "../../components/cells/DateCell";
import { ModelField } from "./model.types";

interface ValidationErrors {
  [cellId: string]: string;
}

const getMuiTableBodyCellEditTextFieldProps = (
  validationErrors: ValidationErrors,
  type?: string
): MRT_ColumnDef["muiTableBodyCellEditTextFieldProps"] => {
  return ({ cell }) => ({
    error: !!validationErrors[cell.id],
    helperText: validationErrors[cell.id],
    type,
  });
};

export const getColumn = (
  field: ModelField,
  validationErrors: ValidationErrors
): MRT_ColumnDef => {
  const baseColumn = {
    accessorKey: field.name,
    header: field.adomin.label ?? field.name,
    size: field.adomin.size ?? 120,
  };

  if (field.type === "number") {
    return {
      ...baseColumn,
      muiTableBodyCellEditTextFieldProps: getMuiTableBodyCellEditTextFieldProps(
        validationErrors,
        "number"
      ),
    };
  }

  if (field.type === "string") {
    return {
      ...baseColumn,
      muiTableBodyCellEditTextFieldProps: getMuiTableBodyCellEditTextFieldProps(
        validationErrors,
        "text"
      ),
    };
  }

  if (field.type === "date") {
    return {
      ...baseColumn,
      muiTableBodyCellEditTextFieldProps:
        getMuiTableBodyCellEditTextFieldProps(validationErrors),
      Cell: DateCell,
    };
  }

  throw new Error(`Unsupported field type '${field.type}'`);
};
