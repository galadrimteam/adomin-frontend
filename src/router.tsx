import { Navigate, createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import HomePage from "./pages/home/HomePage";
import EditModelPage from "./pages/models/EditModelPage";
import ModelListPage from "./pages/models/ModelListPage";
import ModelsPage from "./pages/models/ModelsPage";

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
          { path: ":primaryKeyValue", element: <EditModelPage /> },
        ],
        element: <ModelsPage />,
      },
    ],
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
