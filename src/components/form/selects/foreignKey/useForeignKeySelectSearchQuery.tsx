import { useQuery } from "@tanstack/react-query";
import { privateAxios } from "../../../../axios/privateAxios";
import { ModelListResponse } from "../../../../pages/models/list/ModelGrid";

export const useForeignKeySelectSearchQuery = (
  modelName: string,
  debouncedSearchTerm: string,
  filtersToUse: string
) =>
  useQuery({
    queryKey: ["models", modelName, debouncedSearchTerm],
    queryFn: async () => {
      const queryParams = `pageIndex=1&pageSize=10&filtersMode=or&filters=${filtersToUse}`;

      const res = await privateAxios.get<ModelListResponse>(
        `/adomin/api/crud/${modelName}` + "?" + queryParams
      );
      return res.data;
    },
  });
