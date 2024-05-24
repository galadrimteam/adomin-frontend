import { Navigate, createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
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
    element: <Navigate to="/adomin" />,
  },
  {
    path: "/adomin/folders",
    children: [
      {
        path: ":view",
        element: <FoldersPage />,
      },
    ],
    element: <HomePage />,
  },
  {
    path: "/adomin/stats",
    children: [
      {
        path: ":view",
        element: <StatsPage />,
      },
    ],
    element: <HomePage />,
  },
  {
    path: "/adomin",
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
    path: "/login",
    element: <LoginPage />,
  },
]);
