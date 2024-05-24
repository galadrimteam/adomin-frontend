import { ApiAdominView, ApiFolderView } from "../../utils/api_views.type";

export const flattenFolders = (views: ApiAdominView[]): ApiAdominView[] => {
  const flatViews = views.flatMap((view) => {
    if (view.type === "folder") return [view, ...flattenFolders(view.views)];

    return [];
  });

  return flatViews;
};

export const findFolderConfig = (
  views: ApiAdominView[],
  folderName: string
): ApiFolderView | null => {
  const flatFolders = flattenFolders(views);
  const found = flatFolders.find(
    (view): view is ApiFolderView =>
      view.type === "folder" && view.name === folderName
  );

  return found ?? null;
};
