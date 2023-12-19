import { ReactNode } from "react";
import { RouteObject } from "react-router-dom";
import CustomPage from "./CustomPage";

export interface MakeOverridePageParams {
  model: string;
  type: "create" | "update" | "list";
}

const getPath = ({ model, type }: MakeOverridePageParams) => {
  if (type === "create") return `/adomin/${model}/create`;
  if (type === "update") return `/adomin/${model}/:primaryKeyValue`;

  return `/adomin/${model}`;
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
    element: <CustomPage modelProp={params.model}>{node}</CustomPage>,
  };
};
