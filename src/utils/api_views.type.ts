interface ApiViewBase {
  label: string;
  isHidden: boolean;
  visibilityCheckPassed: boolean;
  name: string;
  icon?: string;
}

export interface ApiModelView extends ApiViewBase {
  type: "model";
  labelPluralized: string;
  counter?: {
    label: string;
    value: number;
  }
}

export interface ApiStatView extends ApiViewBase {
  type: "stats";
}

export interface ApiFolderView extends ApiViewBase {
  type: "folder";
  views: ApiAdominView[];
}

export type ApiAdominView = ApiModelView | ApiStatView | ApiFolderView;
