import { TextField, TextFieldProps } from "@mui/material";
import { ChangeEventHandler, useCallback, useMemo } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { _assertTrue } from "../../utils/assertions";

type TextFieldWrapperProps<T extends string | number> = {
  stringToValue?: (str: string) => T;
  valueToString?: (val: T) => string;
  onChange?: (val: T) => void;
  onBlur?: () => void;
  value: T;
  min?: number;
  max?: number;
  step?: string;
} & Omit<TextFieldProps, "onChange" | "value">;

export const TextFieldWrapper = <T extends string | number>({
  valueToString,
  stringToValue,
  value,
  onChange,
  min,
  max,
  step,
  ...props
}: TextFieldWrapperProps<T>) => {
  const stringValue = useMemo(() => {
    if (valueToString) {
      return valueToString(value);
    }
    _assertTrue(
      typeof value === "string",
      "TextFieldWrapper: if your value is not a string, you must pass a function valueToString"
    );
    return value;
  }, [value, valueToString]);

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = useCallback(
    (e) => {
      const newValue = e.target.value;

      if (stringToValue) {
        onChange?.(stringToValue(newValue));
      } else {
        _assertTrue(
          typeof value === typeof newValue,
          "TextFieldWrapper: type missmatch error, I think you need to provide a function stringToValue"
        );
        onChange?.(newValue as T);
      }
    },
    [onChange, stringToValue, value]
  );

  const inputProps = useMemo(
    () => ({ ...props.inputProps, min, max, step }),
    [min, max, step, props.inputProps]
  );

  return (
    <TextField
      {...props}
      value={stringValue}
      onChange={handleChange}
      inputProps={inputProps}
    />
  );
};

export type TextFieldRhfProps<
  T extends FieldValues,
  Value extends string | number
> = {
  control: Control<T>;
  name: Path<T>;
} & Omit<TextFieldWrapperProps<Value>, "value">;

export const TextFieldRhf = <
  T extends FieldValues,
  Value extends string | number
>(
  props: TextFieldRhfProps<T, Value>
) => {
  const { name, control, onBlur, ...textInputProps } = props;

  const {
    field: { value, onChange, onBlur: rhfOnBlur },
    fieldState: { error },
  } = useController({ name, control });

  const handleBlur = () => {
    onBlur?.();
    rhfOnBlur();
  };

  return (
    <TextFieldWrapper
      {...textInputProps}
      value={value}
      onBlur={handleBlur}
      onChange={onChange}
      error={error?.message !== undefined}
      helperText={error?.message}
    />
  );
};
