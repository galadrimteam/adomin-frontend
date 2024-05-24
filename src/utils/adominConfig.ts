import type { ApiAdominView, ApiModelView } from "./api_views.type";

type AdminUser = Record<string, unknown>;

export interface AdominConfig {
  title: string;
  footerText: string;
  views: ApiAdominView[];
  userDisplayKey: string;
  user: AdminUser;
}

export const isModelView = (view: ApiAdominView): view is ApiModelView => {
  return view.type === "model";
};

export const getFirstLink = (views: ApiAdominView[]): string | null => {
  if (views.length === 0) {
    return null;
  }

  const firstView = views[0];

  return firstView.fullPath;
};
