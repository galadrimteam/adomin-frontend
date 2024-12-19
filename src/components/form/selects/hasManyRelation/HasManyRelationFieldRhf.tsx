import { Box, Chip } from "@mui/material";
import { useMemo, useState } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { privateAxios } from "../../../../axios/privateAxios";
import { AdominHasManyRelationFieldConfig } from "../../../../pages/models/fields.types";
import { ModelData } from "../../../../pages/models/model.types";
import {
  ForeignKeySelect,
  ForeignKeySelectOption,
  ForeignKeySelectProps,
} from "../foreignKey/ForeignKeySelect";
import { getForeignKeyOptionLabel } from "../foreignKey/getForeignKeyOptionLabel";

const noOp = () => {};

export type HasManyRelationFieldRhfProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  fieldConfig: AdominHasManyRelationFieldConfig;
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

export const HasManyRelationFieldRhf = <T extends FieldValues>(
  props: HasManyRelationFieldRhfProps<T>
) => {
  const { name, control, fieldConfig, ...inputProps } = props;
  const [allowRemoveArray, setAllowRemoveArray] = useState<string[]>([]);

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });

  const castedValue = useMemo(() => {
    return value ?? ([] as ModelData[]);
  }, [value]);

  const multiSelectOptions = useMemo(
    () => ({
      alreadySelectedValues: castedValue,
      primaryKeyName: fieldConfig.localKeyName ?? "id",
    }),
    [castedValue, fieldConfig]
  );

  const handleChange = (newValue: string | null) => {
    if (!newValue) return;

    privateAxios
      .get(`/adomin/api/models/crud/${fieldConfig.modelName}/${newValue}`)
      .then((res) => {
        setAllowRemoveArray((prev) => [...prev, newValue]);
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

    const allowRemove = allowRemoveArray.includes(newForeignKeyValue);

    if (allowRemove || fieldConfig.allowRemove === true) {
      return () => onChange(newValue);
    }

    return undefined;
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
        multiSelectOptions={multiSelectOptions}
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
  config: AdominHasManyRelationFieldConfig
): string {
  const value = modelData[config.localKeyName ?? "id"];
  return value.toString();
}
