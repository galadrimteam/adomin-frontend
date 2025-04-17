import {
	MRT_ColumnFiltersState,
	MRT_PaginationState,
	MRT_SortingState,
} from "material-react-table";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { consumeQsObject, prepareQsObject } from "./getModelListQueryString";

export const useModelGridParams = () => {
	const [params, setParams] = useSearchParams();
	const pageIndex = Number(params.get("pageIndex") ?? 0);
	const pageSize = Number(params.get("pageSize") ?? 10);
	const pagination = useMemo(
		() => ({
			pageIndex,
			pageSize,
		}),
		[pageIndex, pageSize]
	);

	const setPagination: React.Dispatch<
		React.SetStateAction<MRT_PaginationState>
	> = (
		newPagination:
			| MRT_PaginationState
			| ((old: MRT_PaginationState) => MRT_PaginationState)
	) => {
			const newValue =
				typeof newPagination === "function"
					? newPagination(pagination)
					: newPagination;

			params.set("pageIndex", newValue.pageIndex.toString());
			params.set("pageSize", newValue.pageSize.toString());

			setParams(params);
		};

	const globalFilter = params.get("globalFilter") ?? "";
	const setGlobalFilter: React.Dispatch<React.SetStateAction<string>> = (
		newGlobalFilter
	) => {
		if (typeof newGlobalFilter === 'undefined') {
			newGlobalFilter = ""
		}
		const newValue =
			typeof newGlobalFilter === "function"
				? newGlobalFilter(globalFilter)
				: newGlobalFilter;
		params.set("globalFilter", newValue);
		setParams(params);
	};
	const [showGlobalFilter, setShowGlobalFilter] = useState(globalFilter !== "");

	const rawSorting = params.get("sorting");

	const sorting = useMemo(() => {
		if (!rawSorting) return [];

		return consumeQsObject<MRT_SortingState>(rawSorting);
	}, [rawSorting]);

	const setSorting: React.Dispatch<React.SetStateAction<MRT_SortingState>> = (
		newSorting: MRT_SortingState | ((old: MRT_SortingState) => MRT_SortingState)
	) => {
		const newValue =
			typeof newSorting === "function" ? newSorting(sorting) : newSorting;

		params.set("sorting", prepareQsObject(newValue));
		setParams(params);
	};

	const rawColumnFilters = params.get("filters");

	const columnFilters = useMemo(() => {
		if (!rawColumnFilters) return [];

		return consumeQsObject<MRT_ColumnFiltersState>(rawColumnFilters);
	}, [rawColumnFilters]);

	const setColumnFilters: React.Dispatch<
		React.SetStateAction<MRT_ColumnFiltersState>
	> = (
		newColumnFilters:
			| MRT_ColumnFiltersState
			| ((old: MRT_ColumnFiltersState) => MRT_ColumnFiltersState)
	) => {
			const newValue =
				typeof newColumnFilters === "function"
					? newColumnFilters(columnFilters)
					: newColumnFilters;
			const containsInvalidDate = newValue.find((f) => f.value instanceof Date && isNaN(f.value.getTime()))

			if (!containsInvalidDate) {
				params.set("filters", prepareQsObject(newValue));
			}

			setParams(params);
		};

	return {
		pagination,
		setPagination,
		globalFilter,
		setGlobalFilter,
		showGlobalFilter,
		setShowGlobalFilter,
		sorting,
		setSorting,
		columnFilters,
		setColumnFilters,
	};
};
