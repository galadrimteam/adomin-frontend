import { useQuery } from "@tanstack/react-query";
import { privateAxios } from "../../axios/privateAxios";
import { ModelFieldsConfig } from "./model.types";

export const useModelConfigQuery = (modelName: string) => {
  const modelQuery = useQuery({
    queryKey: ["modelParams", modelName],
    queryFn: async () => {
      const res = await privateAxios.get<ModelFieldsConfig>(
        `/adomin/api/config/${modelName}`
      );
      return res.data;
    },
  });

  return modelQuery;
};
