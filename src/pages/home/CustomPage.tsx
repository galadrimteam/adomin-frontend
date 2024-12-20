import { Alert, Divider } from "@mui/material";
import { isAxiosError } from "axios";
import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { ADOMIN_LOGIN_PATH } from "../../adominPaths";
import { CenteredSpinner } from "../../components/CenteredSpinner";
import { useIsSmallScreen } from "../../utils/useIsSmallScreen";
import { MobileMenu } from "./MobileMenu";
import { Sidebar } from "./Sidebar";
import { useConfigQuery } from "./useConfigQuery";

type CustomPageProps = PropsWithChildren<{
  currentView?: string;
}>;

function CustomPage({ children, currentView }: CustomPageProps) {
  const configQuery = useConfigQuery();
  const isSmallScreen = useIsSmallScreen();

  if (configQuery.isLoading) {
    return <CenteredSpinner />;
  }

  if (
    configQuery.isError &&
    isAxiosError(configQuery.error) &&
    configQuery.error.response?.status === 401
  ) {
    return <Navigate to={ADOMIN_LOGIN_PATH} />;
  }

  const title = configQuery.data?.title;
  const views = configQuery.data?.views;
  const plugins = configQuery.data?.plugins ?? [];

  if (configQuery.isError || !title || !views) {
    return <Alert severity="error">Une erreur est survenue</Alert>;
  }

  return (
    <div className="flex min-h-screen">
      {isSmallScreen ? (
        <MobileMenu
          title={title}
          views={views}
          currentView={currentView}
          plugins={plugins}
          logo={configQuery.data?.logo ?? null}
        />
      ) : (
        <>
          <Sidebar
            title={title}
            views={views}
            currentView={currentView}
            plugins={plugins}
            logo={configQuery.data?.logo ?? null}
          />
          <Divider
            orientation="vertical"
            flexItem
            className="border-adomin_5"
          />
        </>
      )}
      {children}
    </div>
  );
}

export default CustomPage;
