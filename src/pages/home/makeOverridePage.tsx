import { ReactNode } from "react";
import { RouteObject } from "react-router-dom";
import { AdominMakePathParams, getAdominRouterPath } from "../../adominPaths";
import CustomPage from "./CustomPage";

/**
 * Can be used to override a page in the adomin app.
 *
 * Note that for the *update* page, the url param name is **:primaryKeyValue**
 * so you will have to use useParams like this:
 * const { primaryKeyValue } = useParams();
 */
export const makeOverridePage = (
  params: AdominMakePathParams,
  node: ReactNode
): RouteObject => {
  const path = getAdominRouterPath(params);

  return {
    path,
    element: <CustomPage currentView={params.name}>{node}</CustomPage>,
  };
};
