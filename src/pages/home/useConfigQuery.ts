import { useQuery } from "@tanstack/react-query";
import { privateAxiosWithoutToasts } from "../../axios/privateAxios";
import { AdominConfig } from "../../utils/adominConfig";

export const useConfigQuery = () => {
  const configQuery = useQuery({
    queryKey: ["config"],
    queryFn: async () => {
      const res = await privateAxiosWithoutToasts.get<AdominConfig>(
        "/adomin/api/config"
      );

      return res.data;
    },
  });

  return configQuery;
};
