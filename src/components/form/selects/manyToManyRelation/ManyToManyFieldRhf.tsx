import { Box, Chip } from "@mui/material";
import { useMemo } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { privateAxios } from "../../../../axios/privateAxios";
import { AdominManyToManyRelationFieldConfig } from "../../../../pages/models/fields.types";
import { ModelData } from "../../../../pages/models/model.types";
import {
  ForeignKeySelect,
  ForeignKeySelectOption,
  ForeignKeySelectProps,
} from "../foreignKey/ForeignKeySelect";
import { getForeignKeyOptionLabel } from "../foreignKey/getForeignKeyOptionLabel";

const noOp = () => {};

export type ManyToManyRelationFieldRhfProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  fieldConfig: AdominManyToManyRelationFieldConfig;
} & Omit<
  ForeignKeySelectProps,
  | "value"
  | "onChange"
  | "errorMessage"
  | "selectValue"
  | "setSelectValue"
  | "labelFields"
  | "modelName"
  | "inputLabel"
  | "separator"
>;

export const ManyToManyRelationFieldRhf = <T extends FieldValues>(
  props: ManyToManyRelationFieldRhfProps<T>
) => {
  const { name, control, fieldConfig, ...inputProps } = props;

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });

  const castedValue = useMemo(() => {
    return value ?? ([] as ModelData[]);
  }, [value]);

  const handleChange = (newValue: string | null) => {
    if (!newValue) return;

    privateAxios
      .get(`/adomin/api/models/crud/${fieldConfig.modelName}/${newValue}`)
      .then((res) => {
        onChange([...castedValue, res.data]);
      });
  };

  const optionsFilter = (option: ForeignKeySelectOption) => {
    return !castedValue.some(
      (v) => getForeignKeyValue(v, fieldConfig) === option.value.toString()
    );
  };

  const handleDelete = (option: ModelData) => {
    const newForeignKeyValue = getForeignKeyValue(option, fieldConfig);
    const newValue = castedValue.filter(
      (v) => getForeignKeyValue(v, fieldConfig) !== newForeignKeyValue
    );

    return () => onChange(newValue);
  };

  const afterChange = (
    _newValue: string | null,
    inputHtmlElement: HTMLInputElement | null
  ) => {
    if (!inputHtmlElement) return;

    inputHtmlElement.blur();
  };

  return (
    <Box>
      <ForeignKeySelect
        {...inputProps}
        labelFields={fieldConfig.labelFields}
        modelName={fieldConfig.modelName}
        inputLabel={fieldConfig.label ?? name}
        separator={fieldConfig.labelFieldsSeparator}
        value={value?.toString() ?? null}
        onChange={handleChange}
        errorMessage={error?.message}
        selectValue={null}
        setSelectValue={noOp}
        optionsFilter={optionsFilter}
        afterChange={afterChange}
      />

      <div>
        {castedValue.map((o) => (
          <Chip
            key={getForeignKeyValue(o, fieldConfig)}
            label={getForeignKeyOptionLabel(
              o,
              fieldConfig.labelFields,
              fieldConfig.labelFieldsSeparator
            )}
            size="medium"
            onDelete={handleDelete(o)}
            className="m-1"
          />
        ))}
      </div>
    </Box>
  );
};

function getForeignKeyValue(
  modelData: ModelData,
  config: AdominManyToManyRelationFieldConfig
): string {
  const value = modelData[config.relatedKeyName ?? "id"];
  return value.toString();
}
