import { Alert, SxProps } from "@mui/material";
import { Control, FieldValues } from "react-hook-form";
import { ModelFieldsConfig } from "../../pages/models/model.types";
import { CheckboxRhf } from "./CheckboxRhf";
import DatePickerRhf from "./DatePickerRhf";
import { DoubleFields } from "./MultipleFields";
import { SwitchRhf } from "./SwitchRhf";
import { TextFieldRhf } from "./TextFieldRhf";
import { numberToString, stringToNumber } from "./TextFieldRhfUtils";
import { FileInputRhf } from "./files/FileInputRhf";
import { BasicStringSelectRhf } from "./selects/BasicSelectRhf";
import { ForeignKeySelectRhf } from "./selects/ForeignKeySelectRhf";

interface Props {
  config: ModelFieldsConfig;
  control: Control<FieldValues>;
  mode: "create" | "update";
}

export const FieldsRenderer = ({ config, control, mode }: Props) => {
  const fieldsToUse = config.fields.filter((field) => {
    if (field.name === config.primaryKey) return false;
    if (mode === "create") return field.adomin.creatable !== false;
    if (mode === "update") return field.adomin.editable !== false;

    return true;
  });

  return (
    <DoubleFields my={2}>
      {fieldsToUse.map((field, index) => {
        const key = field.name;
        const label = field.adomin.label ?? field.name;
        const sx: SxProps = { mb: index !== fieldsToUse.length - 1 ? 4 : 0 };
        const optionalOrNullable =
          field.adomin.optional || field.adomin.nullable;
        const required = !optionalOrNullable;

        const fieldType = field.adomin.type;

        if (field.adomin.type === "date") {
          return (
            <DatePickerRhf
              key={key}
              label={label}
              name={field.name}
              control={control}
              sx={sx}
              required={required}
            />
          );
        }

        if (field.adomin.type === "number") {
          return (
            <TextFieldRhf
              key={key}
              label={label}
              type="number"
              name={field.name}
              control={control}
              stringToValue={stringToNumber}
              valueToString={numberToString}
              min={field.adomin.min}
              max={field.adomin.max}
              step={field.adomin.step?.toString()}
              sx={sx}
              required={required}
            />
          );
        }

        if (field.adomin.type === "string") {
          return (
            <TextFieldRhf
              key={key}
              label={label}
              type="text"
              name={field.name}
              control={control}
              sx={sx}
              required={required}
            />
          );
        }

        if (field.adomin.type === "boolean") {
          const BooleanComponent =
            field.adomin.variant === "switch" ? SwitchRhf : CheckboxRhf;

          return (
            <BooleanComponent
              key={key}
              label={label}
              name={field.name}
              control={control}
              sx={sx}
            />
          );
        }

        if (field.adomin.type === "enum") {
          return (
            <BasicStringSelectRhf
              key={key}
              label={label}
              name={field.name}
              control={control}
              options={field.adomin.options}
              sx={sx}
            />
          );
        }

        if (field.adomin.type === "file") {
          return <FileInputRhf key={key} control={control} name={field.name} />;
        }

        if (field.adomin.type === "array") {
          return (
            <TextFieldRhf
              key={key}
              label={label}
              type="text"
              name={field.name}
              control={control}
              sx={sx}
              valueToString={(value) =>
                ((value as unknown as string[] | undefined) ?? []).join(",")
              }
              stringToValue={(value) => value.split(",") as unknown as string}
            />
          );
        }

        if (field.adomin.type === "foreignKey") {
          return (
            <ForeignKeySelectRhf
              key={key}
              control={control}
              name={field.name}
              labelField={field.adomin.labelField}
              modelName={field.adomin.modelName}
              inputLabel={field.adomin.label ?? field.name}
            />
          );
        }

        return (
          <div key={key} className="">
            <Alert className="h-[56px]" severity="error">
              Unknown field type '{fieldType}' for field '{field.name}'
            </Alert>
          </div>
        );
      })}
    </DoubleFields>
  );
};
