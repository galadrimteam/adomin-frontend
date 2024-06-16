import type { ApiAdominView } from "../../utils/api_views.type";

export const getCurrentFolderNames = (
  views: ApiAdominView[],
  currentView: string | null,
  folderNames: string[] = []
): string[] => {
  if (!currentView) return [];

  for (const view of views) {
    if (view.name === currentView) return folderNames;
    if (view.type !== "folder") continue;

    const foundFolders = getCurrentFolderNames(view.views, currentView, [
      ...folderNames,
      view.name,
    ]);

    if (foundFolders.length > folderNames.length) return foundFolders;
  }

  return [];
};
