import { Button } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { getModelPath } from "../../../adominPaths";
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

  const modelListPath = getModelPath({ name: modelConfig.name, type: "list" });

  return (
    <form
      className="bg-white rounded-md w-[80%] mt-8 p-4 border border-adomin_5"
      onSubmit={handleSubmit(createModel)}
    >
      <FieldsRenderer mode="create" config={modelConfig} control={control} />

      <div className="flex justify-center gap-4">
        <Link to={modelListPath}>
          <Button>Annuler</Button>
        </Link>
        <Button loading={isLoading} type="submit" variant="contained">
          Sauvegarder
        </Button>
      </div>
    </form>
  );
};
