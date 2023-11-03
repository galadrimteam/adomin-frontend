import { observer } from "mobx-react-lite";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { FileInput, FileInputProps } from "./FileInput";

export type FileInputRhfProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
} & Omit<FileInputProps, "fileStore">;

export const FileInputRhf = observer(
  <T extends FieldValues>(props: FileInputRhfProps<T>) => {
    const { name, control } = props;

    const {
      field: { value },
    } = useController({ name, control });

    return <FileInput fileStore={value} />;
  }
);
