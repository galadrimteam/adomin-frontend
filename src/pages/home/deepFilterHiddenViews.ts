import type { ApiAdominView } from "../../utils/api_views.type";

export const deepFilterHiddenViews = (
  views: ApiAdominView[]
): ApiAdominView[] => {
  const shallowFilteredViews = views.filter((view) => !view.isHidden);

  const deepFilteredViews = shallowFilteredViews.map((view) => {
    if (view.type === "folder") {
      return {
        ...view,
        views: deepFilterHiddenViews(view.views),
      };
    }

    return view;
  });

  return deepFilteredViews;
};
