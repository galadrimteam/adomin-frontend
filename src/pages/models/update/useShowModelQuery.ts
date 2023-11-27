import { useQuery } from "@tanstack/react-query";
import { privateAxios } from "../../../axios/privateAxios";
import { ModelData } from "../model.types";

export const useShowModelQuery = (
  modelName: string,
  primaryKeyValue: string | number | null
) => {
  return useQuery({
    queryKey: ["model", modelName, primaryKeyValue],
    queryFn: async () => {
      const res = await privateAxios.get<ModelData>(
        `/adomin/api/crud/${modelName}/${primaryKeyValue}`
      );
      return res.data;
    },
    enabled: !!primaryKeyValue,
  });
};
