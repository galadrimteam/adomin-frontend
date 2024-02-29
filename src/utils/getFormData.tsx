import { format } from "date-fns";
import { FileStore } from "../components/form/files/FileStore";
import { ModelField, ModelFieldsConfig } from "../pages/models/model.types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const appendData = (formData: FormData, field: ModelField, data: any) => {
  const dataToAppend = data[field.name];

  if (dataToAppend === undefined) return;

  if (field.adomin.type === "file" && dataToAppend instanceof FileStore) {
    const file = dataToAppend.resizedBlob ?? dataToAppend.file;
    // if file = null and we don't want to destroy the file, we don't append it to the form data
    // if file = null and we want to destroy the file, we append it to the form data with "" value (with be parsed as null in the backend)
    if (file === null && !dataToAppend.shouldDestroy) return;
    return formData.append(field.name, file ?? "");
  }
  if (field.adomin.type === "date" && field.adomin.subType === "date") {
    return formData.append(field.name, format(dataToAppend, "yyyy-MM-dd"));
  }
  if (field.adomin.type === "date" && field.adomin.subType === "datetime") {
    return formData.append(field.name, dataToAppend.toISOString());
  }

  if (field.adomin.type === "array" && Array.isArray(dataToAppend)) {
    for (const item of dataToAppend) {
      formData.append(`${field.name}[]`, item);
    }
    return;
  }

  if (dataToAppend === null) {
    return formData.append(field.name, "");
  }

  formData.append(field.name, dataToAppend);
};

export const getFormData = (data: unknown, config: ModelFieldsConfig) => {
  const formData = new FormData();

  for (const field of config.fields) {
    appendData(formData, field, data);
  }

  return formData;
};
