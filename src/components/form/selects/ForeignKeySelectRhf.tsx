import { Autocomplete, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { privateAxios } from "../../../axios/privateAxios";
import type { ModelListResponse } from "../../../pages/models/list/ModelGrid";
import { useModelConfigQuery } from "../../../pages/models/useModelConfigQuery";
import { useDebounce } from "../../../utils/useDebounce";

interface ForeignKeySelectProps {
  value: string | null;
  onChange: (newValue: string | null) => void;
  errorMessage?: string;
  inputLabel: string;
  labelField: string;
  modelName: string;
}

type ForeignKeySelectOption = {
  label: string;
  value: string;
};

const ForeignKeySelect = ({
  modelName,
  labelField,
  value,
  onChange,
  inputLabel,
}: ForeignKeySelectProps) => {
  const [selectValue, setSelectValue] = useState<ForeignKeySelectOption | null>(
    null
  );
  const [inputValue, setInputValue] = useState("");
  const debouncedSearchTerm = useDebounce(inputValue, 500); // 500 ms de délai

  const modelQuery = useModelConfigQuery(modelName);
  const listQuery = useQuery({
    queryKey: ["models", modelName, debouncedSearchTerm],
    queryFn: async () => {
      const queryParams = `pageIndex=1&pageSize=10&globalFilter=${debouncedSearchTerm}&sorting=[]&filters=[]`;

      const res = await privateAxios.get<ModelListResponse>(
        `/adomin/api/crud/${modelName}` + "?" + queryParams
      );
      return res.data;
    },
  });

  const options: { label: string; value: string }[] = useMemo(() => {
    if (!listQuery.data || !modelQuery.data) return [];

    const opts = listQuery.data.data.map((model) => ({
      value: model[modelQuery.data.primaryKey].toString(),
      label: model[labelField]?.toString() ?? "Label manquant",
    }));

    return opts;
  }, [listQuery.data, modelQuery.data, labelField]);

  useEffect(() => {
    if (value === selectValue || value === selectValue?.value) return;

    const optionFound = options.find((option) => option.value === value);

    if (optionFound) {
      setSelectValue(optionFound);
    } else {
      setSelectValue(null);
    }
  }, [options, selectValue, value]);

  return (
    <Autocomplete
      value={selectValue}
      onChange={(_e, newValue) => {
        onChange(newValue?.value ?? null);
      }}
      inputValue={inputValue}
      onInputChange={(_e, newInputValue) => {
        setInputValue(newInputValue);
        if (newInputValue === "") onChange(null);
      }}
      options={options}
      renderInput={(params) => (
        <TextField {...params} label={inputLabel} variant="outlined" />
      )}
      loading={listQuery.isLoading}
      isOptionEqualToValue={(option, value) => option.value === value.value}
    />
  );
};

export type ForeignKeySelectRhfProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
} & Omit<ForeignKeySelectProps, "value" | "onChange" | "errorMessage">;

export const ForeignKeySelectRhf = <T extends FieldValues>(
  props: ForeignKeySelectRhfProps<T>
) => {
  const { name, control, ...inputProps } = props;

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });

  return (
    <ForeignKeySelect
      {...inputProps}
      value={value?.toString() ?? null}
      onChange={onChange}
      errorMessage={error?.message}
    />
  );
};
