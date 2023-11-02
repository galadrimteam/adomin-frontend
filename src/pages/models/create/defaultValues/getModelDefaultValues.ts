import { ModelData, ModelFieldsConfig } from "../../model.types";
import { getDateDefaultValue } from "./getDateDefaultValue";
import { getEnumDefaultValue } from "./getEnumDefaultValue";

export const getModelDefaultValues = (
  modelFieldsConfig: ModelFieldsConfig
): ModelData => {
  const modelData: ModelData = {};

  modelFieldsConfig.fields.forEach((field) => {
    const config = field.adomin;
    if (config.type === "string") {
      modelData[field.name] = config.defaultValue ?? "";
    } else if (config.type === "number") {
      modelData[field.name] = config.defaultValue ?? 0;
    } else if (config.type === "boolean") {
      modelData[field.name] = config.defaultValue ?? false;
    } else if (config.type === "date") {
      modelData[field.name] = getDateDefaultValue(config);
    } else if (config.type === "enum") {
      modelData[field.name] = getEnumDefaultValue(config);
    }
  });

  return modelData;
};
