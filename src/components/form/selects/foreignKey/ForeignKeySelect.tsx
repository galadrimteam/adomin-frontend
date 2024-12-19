import { Autocomplete, SxProps, TextField } from "@mui/material";
import { useMemo, useRef, useState } from "react";
import { prepareQsObject } from "../../../../pages/models/list/getModelListQueryString";
import { ModelData } from "../../../../pages/models/model.types";
import { useModelConfigQuery } from "../../../../pages/models/useModelConfigQuery";
import { useDebounce } from "../../../../utils/useDebounce";
import { getForeignKeyOptionLabel } from "./getForeignKeyOptionLabel";
import { useForeignKeySelectSearchQuery } from "./useForeignKeySelectSearchQuery";

export interface ForeignKeySelectProps {
  value: string | null;
  onChange: (newValue: string | null) => void;
  errorMessage?: string;
  inputLabel?: string;
  labelFields: string[];
  modelName: string;
  separator?: string;
  selectValue: ForeignKeySelectOption | null;
  setSelectValue: (newValue: ForeignKeySelectOption | null) => void;
  autocompleteSize?: "small" | "medium";
  autocompleteVariant?: "filled" | "outlined" | "standard";
  autocompletePlaceholder?: string;
  afterChange?: (
    newValue: string | null,
    inputHtmlElement: HTMLInputElement | null
  ) => void;
  optionsFilter?: (options: ForeignKeySelectOption) => boolean;
  sx?: SxProps;
  multiSelectOptions?: {
    alreadySelectedValues: ModelData[];
    primaryKeyName: string;
  };
}

export type ForeignKeySelectOption = {
  label: string;
  value: string;
};

export const ForeignKeySelect = ({
  modelName,
  labelFields,
  onChange,
  inputLabel,
  separator,
  selectValue,
  setSelectValue,
  autocompleteSize,
  autocompleteVariant = "outlined",
  afterChange,
  autocompletePlaceholder,
  sx,
  optionsFilter,
  multiSelectOptions,
}: ForeignKeySelectProps) => {
  const [inputValue, setInputValue] = useState("");
  const debouncedSearchTerm = useDebounce(inputValue, 500); // 500 ms de délai
  const modelQuery = useModelConfigQuery(modelName);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const filtersToUse = useMemo(() => {
    if (debouncedSearchTerm === "") return JSON.stringify([]);
    return prepareQsObject(
      labelFields.map((labelField) => ({
        id: labelField,
        value: debouncedSearchTerm,
      }))
    );
  }, [debouncedSearchTerm, labelFields]);

  const arrayFiltersToUse = useMemo(() => {
    if (!multiSelectOptions) return "";

    const fkValues = multiSelectOptions.alreadySelectedValues.map(
      (model) => model[multiSelectOptions.primaryKeyName]
    );

    return prepareQsObject([
      {
        id: multiSelectOptions.primaryKeyName,
        value: fkValues,
        mode: "NOT IN",
      },
    ]);
  }, [multiSelectOptions]);

  const listQuery = useForeignKeySelectSearchQuery({
    modelName,
    debouncedSearchTerm,
    filtersToUse,
    arrayFiltersToUse,
  });

  const baseOptions: { label: string; value: string }[] = useMemo(() => {
    if (!listQuery.data || !modelQuery.data) {
      if (selectValue === null) return [];
      return [selectValue];
    }

    const opts = listQuery.data.data.map((model) => ({
      value: model[modelQuery.data.primaryKey].toString(),
      label: getForeignKeyOptionLabel(model, labelFields, separator),
    }));

    if (!selectValue) return opts;

    const found = opts.find((opt) => opt.value === selectValue.value);

    if (found) return opts;

    return [selectValue, ...opts];
  }, [listQuery.data, modelQuery.data, selectValue, labelFields, separator]);

  const options = useMemo(() => {
    if (!optionsFilter) return baseOptions;

    return baseOptions.filter(optionsFilter);
  }, [baseOptions, optionsFilter]);

  return (
    <Autocomplete
      sx={sx}
      size={autocompleteSize}
      value={selectValue}
      onChange={(_e, newValue) => {
        const valueOrNull = newValue?.value ?? null;

        if (afterChange) afterChange(valueOrNull, inputRef.current);
        if (!valueOrNull) setSelectValue(null);

        onChange(valueOrNull);
      }}
      inputValue={inputValue}
      onInputChange={(_e, newInputValue) => {
        setInputValue(newInputValue);
      }}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          label={inputLabel}
          variant={autocompleteVariant}
          placeholder={autocompletePlaceholder}
          inputRef={inputRef}
        />
      )}
      loading={listQuery.isLoading}
      loadingText="Chargement..."
      isOptionEqualToValue={(option, value) => option.value === value.value}
    />
  );
};
