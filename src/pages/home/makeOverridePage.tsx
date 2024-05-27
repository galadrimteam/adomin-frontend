import { ReactNode } from "react";
import { RouteObject } from "react-router-dom";
import { ApiAdominView } from "../../utils/api_views.type";
import CustomPage from "./CustomPage";

type SimplePluralize<T extends string> = T extends `${infer U}s`
  ? `${U}s`
  : `${T}s`;
type ViewType = SimplePluralize<ApiAdominView["type"]>;

export interface MakeOverridePageParams {
  model: string;
  viewType: ViewType;
  type: "create" | "update" | "list";
}

const getPath = ({ model, type, viewType }: MakeOverridePageParams) => {
  if (viewType !== "models") return `/adomin/${viewType}/${model}`;

  if (type === "create") return `/adomin/${viewType}/${model}/create`;
  if (type === "update") return `/adomin/${viewType}/${model}/:primaryKeyValue`;

  return `/adomin/${viewType}/${model}`;
};

/**
 * Can be used to override a page in the adomin app.
 *
 * Note that for the *update* page, the url param name is **:primaryKeyValue**
 * so you will have to use useParams like this:
 * const { primaryKeyValue } = useParams();
 */
export const makeOverridePage = (
  params: MakeOverridePageParams,
  node: ReactNode
): RouteObject => {
  const path = getPath(params);

  return {
    path,
    element: <CustomPage currentView={params.model}>{node}</CustomPage>,
  };
};
