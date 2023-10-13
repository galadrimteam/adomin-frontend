import { SxProps } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Control, FieldValues, Path, useController } from "react-hook-form";

type DateInputRhfProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  sx?: SxProps;
};

function DatePickerRhf<T extends FieldValues>(props: DateInputRhfProps<T>) {
  const { name, control, label, sx } = props;

  const {
    field: { value, onChange, onBlur: rhfOnBlur },
  } = useController({ name, control });

  return (
    <DatePicker
      label={label}
      value={value}
      onChange={onChange}
      onClose={rhfOnBlur}
      sx={sx}
    />
  );
}

export default DatePickerRhf;
