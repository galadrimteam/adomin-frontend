import { format } from "date-fns";
import { FileStore } from "../components/form/files/FileStore";
import { ModelField, ModelFieldsConfig } from "../pages/models/model.types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const appendData = (formData: FormData, field: ModelField, data: any) => {
  const dataToAppend = data[field.name];

  if (dataToAppend === undefined) return;

  if (field.adomin.type === "file" && dataToAppend instanceof FileStore) {
    return formData.append(field.name, dataToAppend.file ?? "");
  }

  if (field.adomin.type === "date" && field.adomin.subType === "date") {
    return formData.append(field.name, format(dataToAppend, "yyyy-MM-dd"));
  }
  if (field.adomin.type === "date" && field.adomin.subType === "datetime") {
    return formData.append(field.name, dataToAppend.toISOString());
  }
  if (field.adomin.type === "enum") {
    return formData.append(field.name, dataToAppend.toString());
  }

  formData.append(field.name, data[field.name]);
};

export const getFormData = (data: unknown, config: ModelFieldsConfig) => {
  const formData = new FormData();

  for (const field of config.fields) {
    appendData(formData, field, data);
  }

  return formData;
};
