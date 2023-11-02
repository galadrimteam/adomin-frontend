import { AdominEnumFieldConfig } from "../../fields.types";

export const getEnumDefaultValue = (fieldConfig: AdominEnumFieldConfig) => {
  if (fieldConfig.defaultValue) {
    return fieldConfig.defaultValue;
  }

  if (fieldConfig.options.length > 0) {
    return fieldConfig.options[0].value;
  }

  return null;
};
