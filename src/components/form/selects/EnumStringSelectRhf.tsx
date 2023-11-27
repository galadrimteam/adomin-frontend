import { useMemo } from "react";
import { FieldValues, useController } from "react-hook-form";
import { BasicSelect } from "./BasicSelect";
import { BasicSelectRhfProps } from "./BasicSelectRhf";

interface EnumOption {
  value: string | null;
  label: string;
  icon?: JSX.Element;
}

interface Props<T extends FieldValues>
  extends Omit<BasicSelectRhfProps<T, string>, "options"> {
  options: EnumOption[];
}

export const EnumStringSelectRhf = <T extends FieldValues>(props: Props<T>) => {
  const { name, control, beforeChange, afterChange, options, ...inputProps } =
    props;

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });

  const handleChange = (newValue: string) => {
    beforeChange?.(newValue);
    onChange(newValue);
    afterChange?.(newValue);
  };

  const optionsProxy = useMemo(
    () =>
      options.map((o) => ({
        ...o,
        value: o.value ?? "",
      })),
    [options]
  );

  return (
    <BasicSelect
      {...inputProps}
      value={value ?? ""}
      onChange={(newValue) => {
        handleChange(newValue);
      }}
      errorMessage={error?.message}
      options={optionsProxy}
    />
  );
};
