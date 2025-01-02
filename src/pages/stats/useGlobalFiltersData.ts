import { useMemo, useState } from "react";
import { getModelDefaultValues } from "../models/create/defaultValues/getModelDefaultValues";
import type { ApiStatFilters } from "./stat.types";

export const useGlobalFiltersData = (filters?: ApiStatFilters) => {
	const globalFiltersDefaultValues = useMemo(() => {
		const fields = Object.entries(filters ?? {}).map(([key, value]) => ({
			name: key,
			adomin: value,
		}));

		return getModelDefaultValues({ fields });
	}, [filters]);
	const [globalFiltersData, setGlobalFiltersData] = useState(globalFiltersDefaultValues);

	return { globalFiltersData, setGlobalFiltersData, globalFiltersDefaultValues };
}