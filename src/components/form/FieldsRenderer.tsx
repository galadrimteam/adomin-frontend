import { Control, FieldValues } from "react-hook-form";
import { ModelFieldsConfig } from "../../pages/models/model.types";
import { FieldsRendererBase } from "./FieldsRendererBase.tsx";

interface Props {
  config: ModelFieldsConfig;
  control: Control<FieldValues>;
  mode: "create" | "update";
}

export const FieldsRenderer = ({ config, control, mode }: Props) => {
  const fieldsToUse = config.fields.filter((field) => {
    if (field.name === config.primaryKey) return false;

    if (mode === "create") return field.adomin.creatable;
    if (mode === "update") return field.adomin.editable;

    return true;
  });

  return <FieldsRendererBase control={control} fieldsToUse={fieldsToUse} />;
};
