import { Navigate, createBrowserRouter } from "react-router-dom";
import {
  ADOMIN_CMS_PAGES_PATH,
  ADOMIN_CMS_PATH,
  ADOMIN_FOLDERS_PATH,
  ADOMIN_HOME_PATH,
  ADOMIN_LOGIN_PATH,
  ADOMIN_MODELS_PATH,
  ADOMIN_STATS_PATH,
} from "./adominPaths";
import { LoginPage } from "./pages/LoginPage";
import { CmsPages } from "./pages/cms/pages/CmsPages";
import EditCmsPage from "./pages/cms/pages/EditCmsPage";
import FoldersPage from "./pages/folders/FoldersPage";
import HomePage from "./pages/home/HomePage";
import ModelsPageLayout from "./pages/models/ModelsPageLayout";
import CreateModelPage from "./pages/models/create/CreateModelPage";
import ModelListPage from "./pages/models/list/ModelListPage";
import EditModelPage from "./pages/models/update/EditModelPage";
import StatsPage from "./pages/stats/StatsPage";

export const adominRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={ADOMIN_HOME_PATH} />,
  },
  {
    path: ADOMIN_HOME_PATH,
    element: <Navigate to={ADOMIN_FOLDERS_PATH} />,
  },
  {
    path: ADOMIN_FOLDERS_PATH,
    children: [
      {
        path: ":view",
        element: <FoldersPage />,
      },
    ],
    element: <HomePage />,
  },
  {
    path: ADOMIN_STATS_PATH,
    children: [
      {
        path: ":view",
        element: <StatsPage />,
      },
    ],
    element: <HomePage />,
  },
  {
    path: ADOMIN_MODELS_PATH,
    children: [
      {
        path: ":view",
        children: [
          { index: true, element: <ModelListPage /> },
          { path: "create", element: <CreateModelPage /> },
          { path: ":primaryKeyValue", element: <EditModelPage /> },
        ],
        element: <ModelsPageLayout />,
      },
    ],
    element: <HomePage />,
  },
  {
    path: ADOMIN_CMS_PATH,
    children: [
      {
        index: true,
        element: <Navigate to={ADOMIN_CMS_PAGES_PATH} />,
      },
      {
        path: ADOMIN_CMS_PAGES_PATH,
        element: <CmsPages />,
      },
      {
        path: "pages/:cmsPageId",
        element: <EditCmsPage />,
      },
    ],
  },
  {
    path: ADOMIN_LOGIN_PATH,
    element: <LoginPage />,
  },
]);
