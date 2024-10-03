import { Box, Button, SxProps } from "@mui/material";
import { JsonEditor } from "json-edit-react";
import { Control, FieldValues, Path, useController } from "react-hook-form";

type JsonWrapperProps = {
  label?: string;
  value: object;
  onChange: (v: object | null) => void;
  sx?: SxProps;
};

export const JsonWrapper = (props: JsonWrapperProps) => {
  const { label, value, onChange, sx } = props;

  return (
    <Box sx={sx}>
      {label && <h3>{label}</h3>}
      {value && <Button onClick={() => onChange(null)}>Supprimer</Button>}

      {value === null && (
        <Button onClick={() => onChange({ key: "value" })}>
          Ajouter un objet
        </Button>
      )}

      {value && (
        <JsonEditor
          rootName={"JSON"}
          data={value}
          onUpdate={({ newData }) => {
            onChange(newData as object);
          }}
        />
      )}
    </Box>
  );
};

type JsonRhfProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
} & Omit<JsonWrapperProps, "onChange" | "value">;

export const JsonRhf = <T extends FieldValues>(props: JsonRhfProps<T>) => {
  const { name, control, ...jsonComponentProps } = props;

  const {
    field: { value, onChange },
  } = useController({ name, control });

  return (
    <JsonWrapper {...jsonComponentProps} value={value} onChange={onChange} />
  );
};
