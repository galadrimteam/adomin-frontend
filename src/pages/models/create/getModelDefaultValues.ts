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
      default:
        throw new Error(
          `Unknown field type: '${field.adomin.type}' use for field '${field.name}'`
        );
    }
  });

  return modelData;
};
