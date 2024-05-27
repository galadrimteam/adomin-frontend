import { Alert } from "@mui/material";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { CenteredSpinner } from "../../components/CenteredSpinner";
import { PageHeading } from "../../components/PageHeading";
import { AdominPageLayout } from "../AdominPageLayout";
import { ModelConfigContext } from "./ModelConfigContext";
import { useModelConfigQuery } from "./useModelConfigQuery";

const ModelsPageLayout = () => {
  const { view } = useParams();
  const navigate = useNavigate();

  if (!view) {
    navigate("/");
    throw new Error("Problème lors de la séléction du Model");
  }

  const modelQuery = useModelConfigQuery(view);

  if (modelQuery.isLoading) {
    return <CenteredSpinner />;
  }

  if (!modelQuery.data || modelQuery.isError) {
    return (
      <AdominPageLayout>
        <PageHeading text={`Modèle ${view}`} />
        <div className="flex items-center my-8 flex-col">
          <Alert severity="error">
            Erreur lors du chargement de la configuration du modèle
          </Alert>
        </div>
      </AdominPageLayout>
    );
  }

  return (
    <AdominPageLayout>
      <ModelConfigContext.Provider value={modelQuery.data}>
        <Outlet />
      </ModelConfigContext.Provider>
    </AdominPageLayout>
  );
};

export default ModelsPageLayout;
