import type { ApiAdominView } from "./utils/api_views.type";

export const ADOMIN_WORD = "backoffice";
export const FOLDERS_WORD = "folders";
export const STATS_WORD = "stats";
export const MODELS_WORD = "models";
export const CMS_WORD = "cms";

export const ADOMIN_HOME_PATH = `/${ADOMIN_WORD}`;
export const ADOMIN_FOLDERS_PATH = `/${ADOMIN_WORD}/${FOLDERS_WORD}`;
export const ADOMIN_STATS_PATH = `/${ADOMIN_WORD}/${STATS_WORD}`;
export const ADOMIN_MODELS_PATH = `/${ADOMIN_WORD}/${MODELS_WORD}`;
export const ADOMIN_CMS_PATH = `/${ADOMIN_WORD}/${CMS_WORD}`;
export const ADOMIN_LOGIN_PATH = "/login";

type ViewType = SimplePluralize<ApiAdominView["type"]>;

export const VIEW_TYPE_TO_WORD: { [K in ViewType]: string } = {
  models: MODELS_WORD,
  stats: STATS_WORD,
  folders: FOLDERS_WORD,
};

export interface AdominMakePathParams {
  name: string;
  viewType: ViewType;
  type: "create" | "update" | "list";
}

export const getAdominRouterPath = ({
  name,
  type,
  viewType,
}: AdominMakePathParams) => {
  const viewTypeWord = VIEW_TYPE_TO_WORD[viewType];

  if (viewType !== "models") return `/${ADOMIN_WORD}/${viewTypeWord}/${name}`;

  if (type === "create")
    return `/${ADOMIN_WORD}/${viewTypeWord}/${name}/create`;
  if (type === "update")
    return `/${ADOMIN_WORD}/${viewTypeWord}/${name}/:primaryKeyValue`;

  return `/${ADOMIN_WORD}/${viewTypeWord}/${name}`;
};

type GetModelPath =
  | {
      type: "create" | "list";
      name: string;
    }
  | {
      type: "update";
      name: string;
      primaryKeyValue: string | number;
    };

export const getModelPath = (params: GetModelPath) => {
  const routerPath = getAdominRouterPath({
    name: params.name,
    type: params.type,
    viewType: "models",
  });

  if (params.type !== "update") return routerPath;

  return routerPath.replace(
    ":primaryKeyValue",
    params.primaryKeyValue.toString()
  );
};

export type SimplePluralize<T extends string> = T extends `${infer U}s`
  ? `${U}s`
  : `${T}s`;

export const simplePluralize = <T extends string>(
  word: T
): SimplePluralize<T> => {
  if (word.endsWith("s")) return `${word}` as SimplePluralize<T>;

  return `${word}s` as SimplePluralize<T>;
};
