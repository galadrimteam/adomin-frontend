import { ModelData } from "../../../../pages/models/model.types";

export const getForeignKeyOptionLabel = (
  data: ModelData,
  labelFields: string[],
  separator = ", "
) => {
  const labels = labelFields
    .map((labelField) => data[labelField])
    .filter((v) => v !== undefined && v !== null && v !== "");
  const label = labels.join(separator);

  if (label === "") return "Label manquant";

  return label;
};
