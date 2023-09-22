import { Navigate, createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import HomePage from "./pages/home/HomePage";
import ModelsPageLayout from "./pages/models/ModelsPageLayout";
import CreateModelPage from "./pages/models/create/CreateModelPage";
import ModelListPage from "./pages/models/list/ModelListPage";
import EditModelPage from "./pages/models/update/EditModelPage";

export const adominRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/adomin" />,
  },
  {
    path: "/adomin",
    children: [
      {
        path: ":model",
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
