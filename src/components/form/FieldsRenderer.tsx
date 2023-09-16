import { Control, FieldValues } from "react-hook-form";
import { ModelFieldsConfig } from "../../pages/models/model.types";
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
        return (
          <TextFieldRhf
            key={field.name}
            label={field.adomin.label ?? field.name}
            type={field.type === "string" ? "text" : "number"}
            name={field.name}
            control={control}
            stringToValue={field.type === "number" ? stringToNumber : undefined}
            valueToString={field.type === "number" ? numberToString : undefined}
            sx={{ mb: index !== fieldsToUse.length - 1 ? 4 : 0 }}
          />
        );
      })}
    </DoubleFields>
  );
};
