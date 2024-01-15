import { SxProps } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Control, FieldValues, Path, useController } from "react-hook-form";

type DateInputRhfProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  sx?: SxProps;
  required?: boolean;
};

export function DateTimePickerRhf<T extends FieldValues>(
  props: DateInputRhfProps<T>
) {
  const { name, control, label, sx, required } = props;

  const {
    field: { value, onChange, onBlur: rhfOnBlur },
  } = useController({ name, control });

  return (
    <DateTimePicker
      label={label}
      value={value}
      onChange={onChange}
      onClose={rhfOnBlur}
      sx={sx}
      slotProps={{
        textField: {
          required,
        },
      }}
    />
  );
}
