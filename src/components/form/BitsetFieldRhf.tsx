import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  SxProps,
  Typography,
} from "@mui/material";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { AdominNumberFieldConfig } from "../../pages/models/fields.types";
import { _assertTrue } from "../../utils/assertions";

export type BitsetFieldWrapperProps = {
  adomin: AdominNumberFieldConfig;
  value: number;
  onChange: (value: number) => void;
  label: string;
  sx?: SxProps;
};

export const BitsetFieldWrapper = ({
  adomin,
  value,
  onChange,
}: BitsetFieldWrapperProps) => {
  _assertTrue(adomin.type === "number");
  const { variant } = adomin;
  _assertTrue(adomin.variant !== undefined);
  _assertTrue(variant?.type === "bitset");

  const allRoles = Object.entries(variant.bitsetValues)
    .filter(([, v]) => v > 0)
    .map(([k]) => k);

  const getLabel = (role: string) => {
    if (variant.bitsetLabels) {
      return variant.bitsetLabels[role];
    }
    return role;
  };

  const handleChange = (role: string, checked: boolean) => {
    if (checked) {
      onChange(value | variant.bitsetValues[role]);
    } else {
      onChange(value & ~variant.bitsetValues[role]);
    }
  };

  return (
    <FormGroup>
      <Typography className="text-sm">{adomin.label}</Typography>
      {allRoles.map((role) => (
        <FormControlLabel
          key={role}
          checked={
            (value & variant.bitsetValues[role]) === variant.bitsetValues[role]
          }
          onChange={(_e, checked) => handleChange(role, checked)}
          control={<Checkbox />}
          label={getLabel(role)}
        />
      ))}
    </FormGroup>
  );
};

export type BitsetFieldRhfProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
} & Omit<BitsetFieldWrapperProps, "value" | "onChange">;

export const BitsetFieldRhf = <T extends FieldValues>(
  props: BitsetFieldRhfProps<T>
) => {
  const { name, control, ...fieldProps } = props;

  const {
    field: { value, onChange },
  } = useController({ name, control });

  return (
    <BitsetFieldWrapper {...fieldProps} value={value} onChange={onChange} />
  );
};
