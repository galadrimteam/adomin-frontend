import { Alert, SxProps } from "@mui/material";
import { Control, FieldValues } from "react-hook-form";
import { AdominFieldConfig } from "../../pages/models/fields.types.ts";
import { BitsetFieldRhf } from "./BitsetFieldRhf";
import { CheckboxRhf } from "./CheckboxRhf";
import { DatePickerRhf } from "./DatePickerRhf";
import { DateTimePickerRhf } from "./DateTimePickerRhf";
import { FileInputRhf } from "./files/FileInputRhf";
import { JsonRhf } from "./JsonRhf.tsx";
import { DoubleFields } from "./MultipleFields";
import { EnumStringSelectRhf } from "./selects/EnumStringSelectRhf";
import { ForeignKeySelectRhf } from "./selects/foreignKey/ForeignKeySelectRhf";
import { HasManyRelationFieldRhf } from "./selects/hasManyRelation/HasManyRelationFieldRhf";
import { ManyToManyRelationFieldRhf } from "./selects/manyToManyRelation/ManyToManyFieldRhf.tsx";
import { SelectArrayRhf } from "./selects/SelectArrayRhf.tsx";
import { SwitchRhf } from "./SwitchRhf";
import { TextFieldRhf } from "./TextFieldRhf";
import { numberToString, stringToNumber } from "./TextFieldRhfUtils";

interface Props {
  fieldsToUse: { name: string; adomin: AdominFieldConfig }[];
  control: Control<FieldValues>;
}

export const FieldsRendererBase = ({ control, fieldsToUse }: Props) => {
  return (
    <DoubleFields my={2}>
      {fieldsToUse.map((field) => {
        const key = field.name;
        const label = field.adomin.label ?? field.name;
        const sx: SxProps | undefined = undefined
        const optionalOrNullable =
          field.adomin.optional || field.adomin.nullable;
        const required = !optionalOrNullable;

        const fieldType = field.adomin.type;

        if (
          field.adomin.type === "date" &&
          field.adomin.subType === "datetime"
        ) {
          return (
            <DateTimePickerRhf
              key={key}
              label={label}
              name={field.name}
              control={control}
              sx={sx}
              required={required}
            />
          );
        }

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

        if (
          field.adomin.type === "number" &&
          field.adomin.variant?.type === "bitset"
        ) {
          return (
            <BitsetFieldRhf
              key={key}
              label={label}
              name={field.name}
              control={control}
              sx={sx}
              adomin={field.adomin}
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
              multiline={field.adomin.multiline}
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
            <EnumStringSelectRhf
              key={key}
              label={label}
              name={field.name}
              control={control}
              options={field.adomin.options}
              addNullOption={optionalOrNullable}
              sx={sx}
            />
          );
        }

        if (field.adomin.type === "file") {
          return (
            <FileInputRhf
              key={key}
              control={control}
              name={field.name}
              config={field.adomin}
            />
          );
        }

        if (field.adomin.type === "json") {
          return (
            <JsonRhf
              key={key}
              control={control}
              name={field.name}
              label={label}
              sx={sx}
            />
          );
        }

        if (field.adomin.type === "array" && field.adomin.options) {
          return (
            <SelectArrayRhf
              key={key}
              label={label}
              name={field.name}
              control={control}
              options={field.adomin.options}
              sx={sx}
            />
          );
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

        if (
          field.adomin.type === "foreignKey" ||
          field.adomin.type === "belongsToRelation" ||
          field.adomin.type === "hasOneRelation"
        ) {
          return (
            <ForeignKeySelectRhf
              key={key}
              control={control}
              name={field.name}
              labelFields={field.adomin.labelFields}
              modelName={field.adomin.modelName}
              inputLabel={field.adomin.label ?? field.name}
              separator={field.adomin.labelFieldsSeparator}
              sx={sx}
            />
          );
        }

        if (field.adomin.type === "hasManyRelation") {
          return (
            <HasManyRelationFieldRhf
              key={key}
              control={control}
              name={field.name}
              fieldConfig={field.adomin}
              sx={sx}
            />
          );
        }

        if (field.adomin.type === "manyToManyRelation") {
          return (
            <ManyToManyRelationFieldRhf
              key={key}
              control={control}
              name={field.name}
              fieldConfig={field.adomin}
              sx={sx}
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
