import { useQuery } from "@tanstack/react-query";
import { privateAxiosWithoutToasts } from "../../axios/privateAxios";
import { FullStatViewConfig } from "./stat.types";

export const useStatConfigQuery = (statName: string) => {
  const modelQuery = useQuery({
    queryKey: ["statParams", statName],
    queryFn: async () => {
      const res = await privateAxiosWithoutToasts.get<FullStatViewConfig>(
        `/adomin/api/config/stats/${statName}`
      );
      return res.data;
    },
  });

  return modelQuery;
};
