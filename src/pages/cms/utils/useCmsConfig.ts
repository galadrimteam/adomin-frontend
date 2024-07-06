import { useQuery } from "@tanstack/react-query";
import { privateAxios } from "../../../axios/privateAxios";
import { CmsConfig } from "./cms.types";

export const useCmsConfig = () => {
  return useQuery({
    queryKey: ["cmsConfig"],
    queryFn: async () => {
      const res = await privateAxios.get<CmsConfig>("/adomin/api/cms/config");
      return res.data;
    },
  });
};
