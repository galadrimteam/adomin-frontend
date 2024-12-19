import { useQuery } from "@tanstack/react-query";
import { privateAxios } from "../../../../axios/privateAxios";
import { ModelListResponse } from "../../../../pages/models/list/ModelGrid";

interface Params {
  modelName: string;
  debouncedSearchTerm: string;
  filtersToUse: string;
  arrayFiltersToUse: string;
}

export const useForeignKeySelectSearchQuery = ({
  modelName,
  debouncedSearchTerm,
  filtersToUse,
  arrayFiltersToUse,
}: Params) =>
  useQuery({
    queryKey: [
      "models",
      modelName,
      debouncedSearchTerm,
      filtersToUse,
      arrayFiltersToUse,
    ],
    queryFn: async () => {
      const queryParams = `pageIndex=1&pageSize=10&filtersMode=or&filters=${filtersToUse}&arrayFilters=${arrayFiltersToUse}`;

      const res = await privateAxios.get<ModelListResponse>(
        `/adomin/api/models/crud/${modelName}` + "?" + queryParams
      );
      return res.data;
    },
  });
