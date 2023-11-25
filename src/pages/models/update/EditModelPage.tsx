import { Alert } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { privateAxios } from "../../../axios/privateAxios";
import { CenteredSpinner } from "../../../components/CenteredSpinner";
import { PageHeading } from "../../../components/PageHeading";
import type { ApiAttachment } from "../../../components/form/files/FileInput";
import { useModelConfig } from "../ModelConfigContext";
import { getFileDefaultValue } from "../create/defaultValues/getFileDefaultValue";
import { ModelData } from "../model.types";
import { EditModelForm } from "./EditModelForm";

const EditModelPage = () => {
  const { primaryKeyValue } = useParams<{
    primaryKeyValue: string;
  }>();

  const modelConfig = useModelConfig();

  if (!primaryKeyValue) {
    throw new Error("Identifiant du model manquant");
  }

  const modelName = modelConfig.name;

  const modelQuery = useQuery({
    queryKey: ["model", modelName, primaryKeyValue],
    queryFn: async () => {
      const res = await privateAxios.get<ModelData>(
        `/adomin/api/crud/${modelName}/${primaryKeyValue}`
      );
      return res.data;
    },
  });

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
