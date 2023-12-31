import { Alert } from "@mui/material";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { CenteredSpinner } from "../../components/CenteredSpinner";
import { useConfigQuery } from "../home/useConfigQuery";
import { ModelConfigContext } from "./ModelConfigContext";
import { useModelConfigQuery } from "./useModelConfigQuery";

const ModelsPageLayout = () => {
  const { model } = useParams<{ model: string }>();
  const configQuery = useConfigQuery();
  const navigate = useNavigate();

  if (!model) {
    navigate("/");
    throw new Error("Problème lors de la séléction du Model");
  }

  const modelQuery = useModelConfigQuery(model);

  if (modelQuery.isLoading) {
    return <CenteredSpinner />;
  }

  if (!modelQuery.data || modelQuery.isError) {
    return (
      <Alert severity="error">
        Erreur lors du chargement de la config du model
      </Alert>
    );
  }

  return (
    <div className="w-full flex flex-col bg-blue-50">
      <div className="flex-1 ">
        <ModelConfigContext.Provider value={modelQuery.data}>
          <Outlet />
        </ModelConfigContext.Provider>
      </div>
      <div className="bg-adomin_4 text-adomin_2 p-2">
        {configQuery.data?.footerText ?? "Loading footer text..."}
      </div>
    </div>
  );
};

export default ModelsPageLayout;
