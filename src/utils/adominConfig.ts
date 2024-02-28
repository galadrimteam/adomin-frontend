interface ModelView {
  type: "model";
  model: string;
  label: string;
  labelPluralized: string;
  isHidden: boolean;
}

interface StatView {
  type: "stats";
  label: string;
  path: string;
  isHidden: boolean;
  visibilityCheckPassed: boolean;
}

export type AdominView = ModelView | StatView;

type AdminUser = Record<string, unknown>;

export interface AdominConfig {
  title: string;
  footerText: string;
  views: AdominView[];
  userDisplayKey: string;
  user: AdminUser;
}

export const isModelView = (view: AdominView): view is ModelView => {
  return view.type === "model";
};

export const getViewPath = (view: AdominView): string => {
  if (view.type === "model") {
    return `/adomin/${view.model}`;
  }

  if (view.type === "stats") {
    return `/adomin/stats/${view.path}`;
  }

  throw new Error("Unknown view type");
};

export const getFirstLink = (views: AdominView[]): string | null => {
  if (views.length === 0) {
    return null;
  }

  const firstView = views[0];

  const path = getViewPath(firstView);

  return path;
};
