import { AdominFieldConfig } from "./fields.types";

export interface ModelField {
  name: string;
  adomin: AdominFieldConfig;
}

export interface ModelFieldsConfig {
  name: string;
  label: string;
  labelPluralized: string;
  fields: ModelField[];
  primaryKey: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ModelData = Record<string, any>;
