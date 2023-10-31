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

export type ModelData = Record<string, string | number | Date>;
