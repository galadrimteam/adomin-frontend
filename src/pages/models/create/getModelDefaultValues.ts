import { ModelData, ModelFieldsConfig } from "../model.types";

export const getModelDefaultValues = (
  modelFieldsConfig: ModelFieldsConfig
): ModelData => {
  const modelData: ModelData = {};

  modelFieldsConfig.fields.forEach((field) => {
    switch (field.adomin.type) {
      case "string":
        modelData[field.name] = "";
        break;
      case "number":
        modelData[field.name] = 0;
        break;
      case "date":
        modelData[field.name] = new Date();
        break;
      case "boolean":
        modelData[field.name] = false;
        break;
      default:
        break;
    }
  });

  return modelData;
};
