import { format } from "date-fns";
import {
  MRT_ColumnFiltersState,
  MRT_PaginationState,
  MRT_SortingState,
} from "material-react-table";
import { ModelField } from "../model.types";

export const prepareQsObject = (
  input: MRT_SortingState | Params["columnFilters"] | Params["arrayFilters"]
) => {
  return encodeURIComponent(JSON.stringify(input));
};

export const consumeQsObject = <T>(input: string) => {
  return JSON.parse(decodeURIComponent(input)) as T;
};

interface ArrayFilter {
  id: string;
  value: string[] | number[]
  mode: 'IN' | 'NOT IN'
}

interface Params {
  columnFilters: MRT_ColumnFiltersState;
  sorting: MRT_SortingState;
  pagination: MRT_PaginationState;
  globalFilter: string;
  arrayFilters?: ArrayFilter[]
}

export const getModelListQueryString = (
  fields: ModelField[],
  { columnFilters, sorting, pagination, globalFilter, arrayFilters }: Params
) => {
  const searchParams = new URLSearchParams();

  searchParams.append("pageIndex", (pagination.pageIndex + 1).toString());
  searchParams.append("pageSize", pagination.pageSize.toString());
  searchParams.append("globalFilter", globalFilter ?? "");
  searchParams.append("sorting", prepareQsObject(sorting ?? []));
  searchParams.append("arrayFilters", prepareQsObject(arrayFilters ?? []))

  const fieldsMap = new Map<string, ModelField>(
    fields.map((field) => [field.name, field])
  );
  const finalColumnFilters = (columnFilters ?? []).map((columnFilter) =>
    formatFilter(columnFilter, fieldsMap)
  ).filter((columnFilter) => columnFilter !== null);

  searchParams.append("filters", prepareQsObject(finalColumnFilters));

  return searchParams.toString();
};

const formatFilter = (
  columnFilter: MRT_ColumnFiltersState[number],
  fields: Map<string, ModelField>
) => {
  const field = fields.get(columnFilter.id);

  if (!field) {
    return columnFilter;
  }

  if (field.adomin.type === "enum") {
    const found = field.adomin.options.find(
      (value) => value.value === columnFilter.value
    );

    return {
      ...columnFilter,
      value: found?.value ?? null,
    };
  }

  if (field.adomin.type === "boolean") {
    return {
      ...columnFilter,
      value: columnFilter.value === "true" ? "1" : "0",
    };
  }

  if (field.adomin.type === "date" && field.adomin.filterVariant === "date") {
    const value = format(columnFilter.value as Date, "yyyy-MM-dd");

    return {
      id: columnFilter.id,
      value,
    };
  }

  if (field.adomin.type === "date" && (!field.adomin.filterVariant || field.adomin.filterVariant === "date-range")) {
    const rangeValue = columnFilter.value as [string | null, string | null]
    const startDate = !rangeValue[0] ? null : format(new Date(rangeValue[0]), "yyyy-MM-dd");
    const endDate = !rangeValue[1] ? null : format(new Date(rangeValue[1]), "yyyy-MM-dd");

    if (!startDate && !endDate) return null

    return {
      id: columnFilter.id,
      value: JSON.stringify([startDate, endDate]),
    }
  }

  if (field.adomin.type === "date" && (!field.adomin.filterVariant || field.adomin.filterVariant === "datetime-range")) {
    const rangeValue = columnFilter.value as [string | null, string | null]
    const startDate = !rangeValue[0] ? null : new Date(rangeValue[0]).toISOString();
    const endDate = !rangeValue[1] ? null : new Date(rangeValue[1]).toISOString();

    if (!startDate && !endDate) return null

    return {
      id: columnFilter.id,
      value: JSON.stringify([startDate, endDate]),
    }
  }

  return columnFilter;
};
