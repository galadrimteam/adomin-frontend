import { Control, FieldValues, Path, useController } from "react-hook-form";

import { BasicSelect, BasicSelectProps } from "./BasicSelect";

type BasicSelectRhfProps<
  T extends FieldValues,
  SelectType extends string | number
> = {
  control: Control<T>;
  name: Path<T>;
  beforeChange?: (newValue: SelectType) => void;
  afterChange?: (newValue: SelectType) => void;
} & Omit<BasicSelectProps<SelectType>, "value">;

const BasicSelectRhf = <
  T extends FieldValues,
  SelectType extends string | number
>(
  props: BasicSelectRhfProps<T, SelectType>
) => {
  const { name, control, beforeChange, afterChange, ...inputProps } = props;

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });

  const handleChange = (newValue: SelectType) => {
    beforeChange?.(newValue);
    onChange(newValue);
    afterChange?.(newValue);
  };

  return (
    <BasicSelect
      {...inputProps}
      value={value}
      onChange={(newValue) => {
        if (newValue) handleChange(newValue);
      }}
      errorMessage={error?.message}
    />
  );
};

export const BasicStringSelectRhf = <T extends FieldValues>(
  props: BasicSelectRhfProps<T, string>
) => {
  return <BasicSelectRhf {...props} />;
};

export const BasicNumberSelectRhf = <T extends FieldValues>(
  props: BasicSelectRhfProps<T, number>
) => {
  return <BasicSelectRhf {...props} />;
};
