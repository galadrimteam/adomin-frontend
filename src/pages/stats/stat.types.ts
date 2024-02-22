export interface ChartConfigBase {
  name: string;
  label: string;
}

export interface ChartConfig extends ChartConfigBase {
  type: "line" | "bar" | "column" | "pie" | "area";
  data: unknown;
}

export interface FullStatViewConfig {
  path: string;
  label: string;
  isHidden: boolean;
  stats: ChartConfig[];
}
