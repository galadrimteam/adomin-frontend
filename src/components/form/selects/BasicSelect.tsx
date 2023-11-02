import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SxProps,
} from "@mui/material";
import { ReactNode } from "react";

export interface BasicSelectOption<T extends string | number> {
  value: T;
  label: string;
  icon?: JSX.Element;
}

export interface BasicSelectProps<T extends string | number> {
  value: T;
  options: readonly BasicSelectOption<T>[];
  onChange?: (value: T) => void;
  sx?: SxProps;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  onBlur?: () => void;
  errorMessage?: string;
  size?: "small" | "medium";
  startAdornment?: ReactNode;
  renderValue?: (value: T) => ReactNode;
}

export const BasicSelect = <T extends string | number>({
  options,
  onChange,
  value,
  sx,
  label,
  required,
  onBlur,
  errorMessage,
  size,
  startAdornment,
  renderValue,
  disabled,
}: BasicSelectProps<T>) => {
  const id = `select-label-${label}`;
  const isString = typeof value === "string";

  return (
    <FormControl fullWidth sx={sx}>
      {label !== undefined && <InputLabel id={id}>{label}</InputLabel>}
      <Select
        labelId={id}
        value={value}
        onChange={(e) => {
          onChange?.((isString ? e.target.value : +e.target.value) as T);
        }}
        label={label}
        required={required}
        onBlur={onBlur}
        error={errorMessage !== undefined}
        size={size}
        startAdornment={startAdornment}
        renderValue={renderValue}
        disabled={disabled}
      >
        {options.map((o) => (
          <MenuItem key={o.value} value={o.value} dense>
            {o.icon}
            {o.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
