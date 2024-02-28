import type { ComponentProps } from "react";
import type { PieChart } from "react-chartkick";

export type ChartkickRowData = ComponentProps<typeof PieChart>["data"];

export type ChartkickOptions = Omit<ComponentProps<typeof PieChart>, "data">;

export interface ChartConfigBase {
  name: string;
  label: string;
  /**
   * Options for the chart
   */
  options?: ChartkickOptions;
}

export interface ChartConfig extends ChartConfigBase {
  type: "line" | "bar" | "column" | "pie" | "area";
  data: ChartkickRowData;
}

export interface FullStatViewConfig {
  path: string;
  label: string;
  isHidden: boolean;
  stats: ChartConfig[];
}
