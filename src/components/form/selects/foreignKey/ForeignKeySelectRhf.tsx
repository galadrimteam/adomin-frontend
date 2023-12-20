import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { useShowModelQuery } from "../../../../pages/models/update/useShowModelQuery";
import {
  ForeignKeySelect,
  ForeignKeySelectOption,
  ForeignKeySelectProps,
} from "./ForeignKeySelect";
import { getForeignKeyOptionLabel } from "./getForeignKeyOptionLabel";

export type ForeignKeySelectRhfProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
} & Omit<
  ForeignKeySelectProps,
  "value" | "onChange" | "errorMessage" | "selectValue" | "setSelectValue"
>;

export const ForeignKeySelectRhf = <T extends FieldValues>(
  props: ForeignKeySelectRhfProps<T>
) => {
  const { name, control, ...inputProps } = props;

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });

  const castedValue = value as string | number | null;
  const [selectValue, setSelectValue] = useState<ForeignKeySelectOption | null>(
    null
  );

  const valueQuery = useShowModelQuery(inputProps.modelName, castedValue);

  useEffect(() => {
    if (!valueQuery.data && castedValue === null) setSelectValue(null);
    if (!valueQuery.data) return;

    if (castedValue === null) {
      setSelectValue(null);
      return;
    }

    const option = {
      label: getForeignKeyOptionLabel(
        valueQuery.data,
        inputProps.labelFields,
        inputProps.separator
      ),
      value: castedValue.toString(),
    };

    if (option.value === selectValue?.value) return;

    setSelectValue(option);
  }, [
    valueQuery.data,
    inputProps.labelFields,
    inputProps.separator,
    castedValue,
    selectValue?.value,
  ]);

  const selectValueIsNullButShouldNot =
    selectValue === null && castedValue !== null;

  if (valueQuery.isLoading || selectValueIsNullButShouldNot) {
    return (
      <div className="flex justify-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <ForeignKeySelect
      {...inputProps}
      value={value?.toString() ?? null}
      onChange={onChange}
      errorMessage={error?.message}
      selectValue={selectValue}
      setSelectValue={setSelectValue}
    />
  );
};
