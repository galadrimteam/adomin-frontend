import { ModelData, ModelFieldsConfig } from "../model.types";

export const getModelDefaultValues = (
  modelFieldsConfig: ModelFieldsConfig
): ModelData => {
  const modelData: ModelData = {};

  modelFieldsConfig.fields.forEach((field) => {
    if (field.type === "string") {
      modelData[field.name] = "";
    } else if (field.type === "number") {
      modelData[field.name] = 0;
    }
  });

  return modelData;
};
