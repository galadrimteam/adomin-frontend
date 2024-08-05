import { Autocomplete, SxProps, TextField } from "@mui/material";
import { useMemo } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";

interface SelectArrayOption <SelectType extends string | number> {
  value: SelectType;
  label: string;
  disabled?: boolean;
}

interface Props<T extends FieldValues, SelectType extends string | number> {
  options: SelectArrayOption<SelectType>[];
  control: Control<T>;
  name: Path<T>;
  label: string;
  sx?: SxProps;
}

export const SelectArrayRhf = <T extends FieldValues, SelectType extends string | number>(props: Props<T, SelectType>) => {
  const {
    name,
    control,
    options,
    label,
    sx,
  } = props;

  const {
    field: { value, onChange },
  } = useController({ name, control });

  const handleChange = (newValue: SelectArrayOption<SelectType>[]) => {
    const newValueToUse = newValue.map((v) => v.value);

    onChange(newValueToUse);
  };

  const optionsProxy = useMemo(() => {
    const optionsToUse = options.map((o) => ({
      ...o,
      value: o.value ?? "",
      disabled: value?.includes(o.value) ?? false,
    }));

    return optionsToUse;
  }, [options, value]);

  const valueProxy: SelectType[] = useMemo(() => {
    if (!value) return [];

    return value.flatMap((v: SelectType) => options.find((o) => o.value === v) ?? []);
  }, [options, value]);

  return (
    <Autocomplete
      //@ts-expect-error MUI Autocomplete is horrible
      value={valueProxy}
      onChange={(_, newValue) => {
        handleChange(newValue);
      }}
      options={optionsProxy}
      multiple
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
        />
      )}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      getOptionDisabled={(option) => option.disabled === true}
      sx={sx}
    />
  );
};
