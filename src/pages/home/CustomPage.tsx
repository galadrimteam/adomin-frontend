import { Alert } from "@mui/material";
import { isAxiosError } from "axios";
import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { CenteredSpinner } from "../../components/CenteredSpinner";
import { Sidebar } from "./Sidebar";
import { useConfigQuery } from "./useConfigQuery";

type CustomPageProps = PropsWithChildren<{
  modelProp?: string;
}>;

function CustomPage({ children, modelProp }: CustomPageProps) {
  const configQuery = useConfigQuery();

  if (configQuery.isLoading) {
    return <CenteredSpinner />;
  }

  if (configQuery.isError) {
    if (
      isAxiosError(configQuery.error) &&
      configQuery.error.response?.status === 401
    ) {
      return <Navigate to="/login" />;
    }
    return <Alert severity="error">Une erreur est survenue</Alert>;
  }

  const title = configQuery.data?.title;
  const models = configQuery.data?.models;

  if (!title || !models) {
    return (
      <Alert severity="error">
        Une erreur est survenue (le backend à renvoyé une réponse mal formattée)
      </Alert>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar title={title} models={models} currentModel={modelProp} />
      {children}
    </div>
  );
}

export default CustomPage;
