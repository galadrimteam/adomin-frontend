import { ApiAttachment } from "../../../components/form/files/FileInput";
import { getFileDefaultValue } from "../create/defaultValues/getFileDefaultValue";
import { ModelData, ModelFieldsConfig } from "../model.types";

export const getModelDefaultValuesForEdition = (
  modelData: ModelData,
  modelConfig: ModelFieldsConfig
): {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
} => {
  const dataToReturn = { ...modelData };

  for (const field of modelConfig.fields) {
    const config = field.adomin;
    const fieldData = dataToReturn[field.name];

    if (config.type === "string") {
      dataToReturn[field.name] = fieldData ?? "";
    } else if (config.type === "date") {
      dataToReturn[field.name] = fieldData ? new Date(fieldData) : null;
    } else if (config.type === "file") {
      dataToReturn[field.name] = getFileDefaultValue(
        config,
        fieldData as ApiAttachment | null
      );
    } else if (
      config.type === "belongsToRelation" ||
      config.type === "hasOneRelation"
    ) {
      const localKey = config.localKeyName ?? "id";

      dataToReturn[field.name] = fieldData?.[localKey] ?? null;
    }
  }

  return dataToReturn;
};
