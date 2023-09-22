import { Alert } from "@mui/material";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import privateAxios from "../../../axios/privateAxios";
import { CenteredSpinner } from "../../../components/CenteredSpinner";
import { PageHeading } from "../../../components/PageHeading";
import { ModelData } from "../model.types";
import { useModelConfigData } from "../useModelConfigData";
import { EditModelForm } from "./EditModelForm";

const EditModelPage = () => {
  const { model, primaryKeyValue } = useParams<{
    model: string;
    primaryKeyValue: string;
  }>();

  const modelConfig = useModelConfigData();
  const navigate = useNavigate();

  if (!model || !primaryKeyValue) {
    navigate("/");
    throw new Error("Problème lors de la séléction du Model");
  }

  const modelName = model;

  const modelQuery = useQuery(
    ["model", modelName, primaryKeyValue],
    async () => {
      const res = await privateAxios.get<ModelData>(
        `/adomin/api/crud/${modelName}/${primaryKeyValue}`
      );
      return res.data;
    }
  );

  if (modelQuery.isLoading || !modelConfig) {
    return <CenteredSpinner />;
  }

  if (!modelQuery.data || modelQuery.isError) {
    return <Alert severity="error">Erreur lors du chargement du model</Alert>;
  }

  return (
    <div className="flex w-full flex-col">
      <PageHeading text={modelConfig.label + " edition"} />
      <div className="flex justify-center">
        <EditModelForm
          modelConfig={modelConfig}
          defaultValues={modelQuery.data}
        />
      </div>
    </div>
  );
};

export default EditModelPage;
