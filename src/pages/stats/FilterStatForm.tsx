import { LoadingButton } from "@mui/lab";
import { useEffect, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FieldsRendererBase } from "../../components/form/FieldsRendererBase";
import { ModelData } from "../models/model.types";
import { ApiStatFilters } from "./stat.types";

interface Props {
  statFilters: ApiStatFilters;
  startSearch: SubmitHandler<ModelData>;
  isLoading: boolean;
  defaultValues: ModelData;
}

export const FilterStatForm = ({
  statFilters,
  startSearch,
  isLoading,
  defaultValues,
}: Props) => {
  const fieldsToUse = useMemo(() => {
    const fields = Object.entries(statFilters).map(([key, value]) => ({
      name: key,
      adomin: value,
    }));

    return fields;
  }, [statFilters]);

  const { handleSubmit, control, reset } = useForm({ defaultValues });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <form
      className="rounded-md w-full mt-8 p-4"
      onSubmit={handleSubmit(startSearch)}
    >
      <FieldsRendererBase fieldsToUse={fieldsToUse} control={control} />

      <div className="flex justify-center gap-4">
        <LoadingButton loading={isLoading} type="submit" variant="contained">
          Appliquer
        </LoadingButton>
      </div>
    </form>
  );
};
