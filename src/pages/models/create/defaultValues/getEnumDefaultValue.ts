import { AdominEnumFieldConfig } from "../../fields.types";

export const getEnumDefaultValue = (fieldConfig: AdominEnumFieldConfig) => {
  if (fieldConfig.config.defaultValue) {
    return fieldConfig.config.defaultValue;
  }

  if (fieldConfig.config.options.length > 0) {
    return fieldConfig.config.options[0].value;
  }

  return null;
};
