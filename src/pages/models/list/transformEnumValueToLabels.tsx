import type { AdominEnumFieldConfig } from "../fields.types";
import type { ModelData, ModelField } from "../model.types";

const isAdominEnumField = (
  field: ModelField
): field is {
  name: string;
  adomin: AdominEnumFieldConfig;
  isVirtual: boolean;
} => {
  return field.adomin.type === "enum";
};

export const transformEnumValueToLabels = (
  fields: ModelField[],
  data: ModelData[] = []
) => {
  const enumFields = fields.filter(isAdominEnumField);

  return data.map((row) => {
    const newRow: Record<string, unknown> = {};

    for (const enumField of enumFields) {
      const option = enumField.adomin.options.find(
        ({ value }) => value === row[enumField.name]
      );
      newRow[enumField.name] = option?.label ?? row[enumField.name];
    }

    return { ...row, ...newRow };
  });
};
