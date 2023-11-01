import { MRT_ColumnDef } from "material-react-table";
import { BooleanCell } from "../../components/cells/BooleanCell";
import { DateCell } from "../../components/cells/DateCell";
import { UnkownTypeCell } from "../../components/cells/UnknownTypeCell";
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

  if (field.adomin.type === "number") {
    return {
      ...baseColumn,
      muiTableBodyCellEditTextFieldProps: getMuiTableBodyCellEditTextFieldProps(
        validationErrors,
        "number"
      ),
    };
  }

  if (field.adomin.type === "string") {
    return {
      ...baseColumn,
      muiTableBodyCellEditTextFieldProps: getMuiTableBodyCellEditTextFieldProps(
        validationErrors,
        "text"
      ),
    };
  }

  if (field.adomin.type === "date") {
    return {
      ...baseColumn,
      muiTableBodyCellEditTextFieldProps:
        getMuiTableBodyCellEditTextFieldProps(validationErrors),
      Cell: DateCell,
    };
  }

  if (field.adomin.type === "boolean") {
    return {
      ...baseColumn,
      muiTableBodyCellEditTextFieldProps:
        getMuiTableBodyCellEditTextFieldProps(validationErrors),
      Cell: BooleanCell,
    };
  }

  return {
    ...baseColumn,
    muiTableBodyCellEditTextFieldProps:
      getMuiTableBodyCellEditTextFieldProps(validationErrors),
    Cell: UnkownTypeCell,
  };
};
