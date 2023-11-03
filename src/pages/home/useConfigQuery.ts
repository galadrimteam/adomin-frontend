import { useQuery } from "react-query";
import { privateAxiosWithoutToasts } from "../../axios/privateAxios";
import { AdominConfig } from "./Sidebar";

export const useConfigQuery = () => {
  const configQuery = useQuery("config", async () => {
    const res = await privateAxiosWithoutToasts.get<AdominConfig>(
      "/adomin/api/config"
    );

    return res.data;
  });

  return configQuery;
};
