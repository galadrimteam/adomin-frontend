import { SxProps } from "@mui/material";
import { Control, FieldValues } from "react-hook-form";
import { ModelFieldsConfig } from "../../pages/models/model.types";
import DatePickerRhf from "./DatePickerRhf";
import { DoubleFields } from "./MultipleFields";
import { TextFieldRhf } from "./TextFieldRhf";
import { numberToString, stringToNumber } from "./TextFieldRhfUtils";

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

        if (field.adomin.type === "date") {
          return (
            <DatePickerRhf
              key={key}
              label={label}
              name={field.name}
              control={control}
              sx={sx}
            />
          );
        }

        if (field.adomin.type === "number") {
          <TextFieldRhf
            key={key}
            label={label}
            type="number"
            name={field.name}
            control={control}
            stringToValue={stringToNumber}
            valueToString={numberToString}
            sx={sx}
          />;
        }

        return (
          <TextFieldRhf
            key={key}
            label={label}
            type="text"
            name={field.name}
            control={control}
            sx={sx}
          />
        );
      })}
    </DoubleFields>
  );
};
