import { AdominFieldConfig } from "./fields.types";

export interface ModelField {
  name: string;
  adomin: AdominFieldConfig;
}

export interface AdominStaticRightsConfig {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
  list: boolean;
}

export interface ModelFieldsConfig {
  name: string;
  label: string;
  labelPluralized: string;
  fields: ModelField[];
  primaryKey: string;
  isHidden: boolean;
  staticRights: AdominStaticRightsConfig;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ModelData = Record<string, any>;
