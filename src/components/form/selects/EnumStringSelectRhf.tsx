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
  addNullOption?: boolean;
}

export const EnumStringSelectRhf = <T extends FieldValues>(props: Props<T>) => {
  const {
    name,
    control,
    beforeChange,
    afterChange,
    options,
    addNullOption,
    ...inputProps
  } = props;

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });

  const handleChange = (newValue: string) => {
    beforeChange?.(newValue);
    onChange(newValue);
    afterChange?.(newValue);
  };

  const optionsProxy = useMemo(() => {
    const optionsToUse = options.map((o) => ({
      ...o,
      value: o.value ?? "",
    }));
    const hasNullOption = optionsToUse.some((o) => o.value === "");

    if (!hasNullOption && addNullOption) {
      return [
        {
          label: "(Aucune valeur)",
          value: "",
        },
        ...optionsToUse,
      ];
    }

    return optionsToUse;
  }, [options, addNullOption]);

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
