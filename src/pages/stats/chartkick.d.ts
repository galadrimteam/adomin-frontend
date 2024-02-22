type ChartComponent = React.FC<{
  data: unknown;
  label?: string;
  width?: string | number;
  height?: string | number;
  download?: boolean;
  suffix?: string;
  prefix?: string;
}>;

declare module "react-chartkick" {
  export const PieChart: ChartComponent;
  export const BarChart: ChartComponent;
  export const ColumnChart: ChartComponent;
  export const LineChart: ChartComponent;
  export const AreaChart: ChartComponent;
}
