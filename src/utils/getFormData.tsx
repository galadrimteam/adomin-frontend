import { format } from "date-fns";
import { FileStore } from "../components/form/files/FileStore";
import { ModelField, ModelFieldsConfig } from "../pages/models/model.types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const appendData = (formData: FormData, field: ModelField, data: any) => {
  const dataToAppend = data[field.name];

  if (dataToAppend === undefined) return;

  if (field.adomin.type === "hasManyRelation" && Array.isArray(dataToAppend)) {
    const localKey = field.adomin.localKeyName ?? "id";
    const arrValues = dataToAppend.map((v) => v[localKey]);
    arrValues.forEach((v) => formData.append(`${field.name}[]`, v));
    return;
  }
  if (
    field.adomin.type === "manyToManyRelation" &&
    Array.isArray(dataToAppend)
  ) {
    const localKey = field.adomin.relatedKeyName ?? "id";
    const arrValues = dataToAppend.map((v) => v[localKey]);
    arrValues.forEach((v) => formData.append(`${field.name}[]`, v));
    return;
  }
  if (field.adomin.type === "file" && dataToAppend instanceof FileStore) {
    const file = dataToAppend.resizedBlob ?? dataToAppend.file;
    // if file = null and we don't want to destroy the file, we don't append it to the form data
    // if file = null and we want to destroy the file, we append it to the form data with "" value (with be parsed as null in the backend)
    if (file === null && !dataToAppend.shouldDestroy) return;
    return formData.append(field.name, file ?? "");
  }
  if (field.adomin.type === "date" && field.adomin.subType === "date" && dataToAppend) {
    return formData.append(field.name, format(dataToAppend, "yyyy-MM-dd"));
  }
  if (field.adomin.type === "date" && field.adomin.subType === "datetime" && dataToAppend) {
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

export const getFormData = (
  data: unknown,
  config: ModelFieldsConfig,
  mode: "create" | "update"
) => {
  const formData = new FormData();

  const filteredFields = config.fields.filter((field) => {
    if (mode === "create") return field.adomin.creatable ?? true;

    return field.adomin.editable ?? true;
  });

  for (const field of filteredFields) {
    appendData(formData, field, data);
  }

  return formData;
};
