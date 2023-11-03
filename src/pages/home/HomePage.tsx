import { Alert } from "@mui/material";
import { isAxiosError } from "axios";
import { Navigate, Outlet } from "react-router-dom";
import { CenteredSpinner } from "../../components/CenteredSpinner";
import { Sidebar } from "./Sidebar";
import { useConfigQuery } from "./useConfigQuery";

function HomePage() {
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
      <Sidebar title={title} models={models} />
      <Outlet />
    </div>
  );
}

export default HomePage;
