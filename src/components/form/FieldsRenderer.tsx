import { Alert, SxProps } from "@mui/material";
import { Control, FieldValues } from "react-hook-form";
import { ModelFieldsConfig } from "../../pages/models/model.types";
import { CheckboxRhf } from "./CheckboxRhf";
import DatePickerRhf from "./DatePickerRhf";
import { DoubleFields } from "./MultipleFields";
import { SwitchRhf } from "./SwitchRhf";
import { TextFieldRhf } from "./TextFieldRhf";
import { numberToString, stringToNumber } from "./TextFieldRhfUtils";
import {
  BasicNumberSelectRhf,
  BasicStringSelectRhf,
} from "./selects/BasicSelectRhf";

interface Props {
  config: ModelFieldsConfig;
  control: Control<FieldValues>;
}

export const FieldsRender = ({ config, control }: Props) => {
  const fieldsToUse = config.fields.filter(
    (field) => field.name !== config.primaryKey
  );

  return (
    <DoubleFields my={2}>
      {fieldsToUse.map((field, index) => {
        const key = field.name;
        const label = field.adomin.label ?? field.name;
        const sx: SxProps = { mb: index !== fieldsToUse.length - 1 ? 4 : 0 };
        const optionalOrNullable =
          field.adomin.optional || field.adomin.nullable;
        const required = !optionalOrNullable;

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

        if (
          field.adomin.type === "enum" &&
          field.adomin.config.subType === "string"
        ) {
          return (
            <BasicStringSelectRhf
              key={key}
              label={label}
              name={field.name}
              control={control}
              options={field.adomin.config.options}
              sx={sx}
            />
          );
        }

        if (
          field.adomin.type === "enum" &&
          field.adomin.config.subType === "number"
        ) {
          return (
            <BasicNumberSelectRhf
              key={key}
              label={label}
              name={field.name}
              control={control}
              options={field.adomin.config.options}
              sx={sx}
            />
          );
        }

        return (
          <div key={key} className="">
            <Alert className="h-[56px]" severity="error">
              Unknown field type '{field.adomin.type}' for field '{field.name}'
            </Alert>
          </div>
        );
      })}
    </DoubleFields>
  );
};
