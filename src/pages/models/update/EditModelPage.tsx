import { Alert } from "@mui/material";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { CenteredSpinner } from "../../../components/CenteredSpinner";
import { PageHeading } from "../../../components/PageHeading";
import { useModelConfig } from "../ModelConfigContext";
import { EditModelForm } from "./EditModelForm";
import { getModelDefaultValuesForEdition } from "./getModelDefaultValuesForEdition";
import { useShowModelQuery } from "./useShowModelQuery";

const EditModelPage = () => {
  const { primaryKeyValue } = useParams<{
    primaryKeyValue: string;
  }>();

  const modelConfig = useModelConfig();

  if (!primaryKeyValue) {
    throw new Error("Identifiant du model manquant");
  }

  const modelName = modelConfig.name;

  const modelQuery = useShowModelQuery(modelName, primaryKeyValue);

  const modelQueryData = useMemo(() => {
    if (!modelQuery.data) return undefined;

    return getModelDefaultValuesForEdition(modelQuery.data, modelConfig);
  }, [modelConfig, modelQuery.data]);

  if (modelQuery.isLoading || !modelConfig) {
    return <CenteredSpinner />;
  }

  if (!modelQueryData || modelQuery.isError) {
    return <Alert severity="error">Erreur lors du chargement du model</Alert>;
  }

  return (
    <div className="flex w-full flex-col">
      <PageHeading text={modelConfig.label + " edition"} />
      <div className="flex justify-center">
        <EditModelForm
          modelConfig={modelConfig}
          defaultValues={modelQueryData}
        />
      </div>
    </div>
  );
};

export default EditModelPage;
