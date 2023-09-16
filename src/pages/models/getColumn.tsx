import { MRT_ColumnDef } from "material-react-table";
import { ModelField } from "./model.types";

export const getColumn = (
  field: ModelField,
  validationErrors: {
    [cellId: string]: string;
  }
): MRT_ColumnDef => {
  const baseColumn = {
    accessorKey: field.name,
    header: field.adomin.label ?? field.name,
    size: field.adomin.size ?? 120,
  };

  if (field.type === "number") {
    return {
      ...baseColumn,
      muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        type: "number",
      }),
    };
  }

  if (field.type === "string") {
    return {
      ...baseColumn,
      muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        type: "text",
      }),
    };
  }

  throw new Error(`Unsupported field type '${field.type}'`);
};
