export interface ModelField {
  name: string;
  type: "number" | "string";
  adomin: {
    label?: string;
    editable?: boolean;
    creatable?: boolean;
    size?: number;
  };
}

export interface ModelFieldsConfig {
  name: string;
  label: string;
  labelPluralized: string;
  fields: ModelField[];
  primaryKey: string;
}

export type ModelData = Record<string, string | number>;
