import { Alert } from "@mui/material";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { CenteredSpinner } from "../../../components/CenteredSpinner";
import { PageHeading } from "../../../components/PageHeading";
import type { ApiAttachment } from "../../../components/form/files/FileInput";
import { useModelConfig } from "../ModelConfigContext";
import { getFileDefaultValue } from "../create/defaultValues/getFileDefaultValue";
import { EditModelForm } from "./EditModelForm";
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

    const dataToReturn = { ...modelQuery.data };

    for (const modelField of modelConfig.fields) {
      if (modelField.adomin.type === "date") {
        dataToReturn[modelField.name] = new Date(dataToReturn[modelField.name]);
      }
      if (modelField.adomin.type === "file") {
        dataToReturn[modelField.name] = getFileDefaultValue(
          modelField.adomin,
          dataToReturn[modelField.name] as ApiAttachment | null
        );
      }
    }

    return dataToReturn;
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
