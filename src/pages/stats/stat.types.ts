import type { ComponentProps } from "react";
import type { PieChart } from "react-chartkick";
import { AdominFieldConfig } from "../models/fields.types";

export type ChartkickRowData = ComponentProps<typeof PieChart>["data"];

export type ChartkickOptions = Omit<ComponentProps<typeof PieChart>, "data">;

export type ApiStatFilters = {
  [K in string]: ApiStatFilter
}

export type ApiStatFilter = AdominFieldConfig

interface AdominStatBase {
  /**
   * Label of the stat, displayed in the frontend
   */
  label: string;
  /**
   * Name of the stat, used to identify it in the frontend
   *
   * (e.g. in the react key prop)
   */
  name: string;
  /**
   * Form filters
   */
  filters?: ApiStatFilters
}

export interface ChartKickStat extends AdominStatBase {
  /**
   * Type of the chart to display
   */
  type: "pie" | "bar" | "column" | "line" | "area";
  /**
   * Options for the chart
   */
  options?: ChartkickOptions;
}

interface KpiStatOptions {
  /**
   * If true, the value should be a number between 0-100 and will be displayed as a percentage
   * @default false
   */
  isPercentage?: boolean;
  /**
   * Color of the mui CircularProgress
   */
  color?: string;
}

export interface KpiStat extends AdominStatBase {
  /**
   * Type of the chart to display
   */
  type: "kpi";
  /**
   * Options for the chart
   */
  options?: KpiStatOptions;
}

export type KpiStatData = string | number;

export type AdominStat = ChartKickStat | KpiStat;
export interface FullStatViewConfig {
  path: string;
  label: string;
  isHidden: boolean;
  gridTemplateAreas?: string | { normal: string; sm: string };
  stats: AdominStat[];
  /**
   * Global form filters
   */
  globalFilters?: ApiStatFilters
}
