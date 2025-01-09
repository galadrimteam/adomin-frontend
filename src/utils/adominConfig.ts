import type { ApiAdominView, ApiModelView } from "./api_views.type";
import { getViewPath } from "./get_view_path";

type AdminUser = Record<string, unknown>;

export type AdominPlugin = "cms";

export interface AdominConfig {
  title: string;
  footerText: string;
  views: ApiAdominView[];
  userDisplayKey: string;
  user: AdminUser;
  plugins: AdominPlugin[];
  logo: AdominLogoConfig | null;
}

interface AdominLogoConfig {
  url: string
  maxWidth?: number
  maxHeight?: number
  /** where to show backoffice title along with logo, if not set, the title will not be shown */
  textPosition?: 'bottom' | 'right'
}

export const isModelView = (view: ApiAdominView): view is ApiModelView => {
  return view.type === "model";
};

export const getFirstLink = (views: ApiAdominView[]): string | null => {
  if (views.length === 0) return null;

  const firstView = views[0];
  const fullPath = getViewPath(firstView)

  return fullPath;
};
