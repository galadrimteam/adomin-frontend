import { getAdominRouterPath, simplePluralize } from "../adominPaths";
import { ApiAdominView } from "./api_views.type";

export const getViewPath = (view: ApiAdominView) => {
	if (view.type === "custom") return view.href;

	return getAdominRouterPath({
		name: view.name,
		type: "list",
		viewType: simplePluralize(view.type),
	});
};