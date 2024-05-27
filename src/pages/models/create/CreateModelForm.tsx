import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { CenteredSpinner } from "../../../components/CenteredSpinner";
import { FieldsRenderer } from "../../../components/form/FieldsRenderer";
import { ModelFieldsConfig } from "../model.types";
import { getModelDefaultValues } from "./defaultValues/getModelDefaultValues";
import { useCreateModel } from "./useCreateModel";

interface Props {
  modelConfig: ModelFieldsConfig;
}

export const CreateModelForm = ({ modelConfig }: Props) => {
  const defaultValues = useMemo(
    () => getModelDefaultValues(modelConfig),
    [modelConfig]
  );

  const { handleSubmit, control, reset } = useForm({ defaultValues });
  const { createModel, isLoading } = useCreateModel({ modelConfig });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  if (!modelConfig) return <CenteredSpinner />;

  return (
    <form
      className="bg-white rounded-md w-[80%] mt-8 p-4"
      onSubmit={handleSubmit(createModel)}
    >
      <FieldsRenderer mode="create" config={modelConfig} control={control} />

      <div className="flex justify-center gap-4">
        <Link to={`/adomin/models/${modelConfig.name}`}>
          <Button>Annuler</Button>
        </Link>
        <LoadingButton loading={isLoading} type="submit" variant="contained">
          Sauvegarder
        </LoadingButton>
      </div>
    </form>
  );
};
