import { Button } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { getModelPath } from "../../../adominPaths";
import { CenteredSpinner } from "../../../components/CenteredSpinner";
import { FieldsRenderer } from "../../../components/form/FieldsRenderer";
import { ModelData, ModelFieldsConfig } from "../model.types";
import { useUpdateModel } from "./useUpdateModel";

interface Props {
  defaultValues: ModelData;
  modelConfig: ModelFieldsConfig;
}

export const EditModelForm = ({ defaultValues, modelConfig }: Props) => {
  const { handleSubmit, control, reset } = useForm({ defaultValues });
  const { updateModel, isLoading } = useUpdateModel({ modelConfig });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  if (!modelConfig) return <CenteredSpinner />;

  const modelListPath = getModelPath({ name: modelConfig.name, type: "list" });

  return (
    <form
      className="bg-white rounded-md w-[80%] mt-8 p-4 border border-adomin_5"
      onSubmit={handleSubmit(updateModel)}
    >
      <FieldsRenderer mode="update" config={modelConfig} control={control} />

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
