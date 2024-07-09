import { useQuery } from "@tanstack/react-query";
import { privateAxios } from "../../../../axios/privateAxios";
import { CmsPage } from "../../utils/cms.types";

export const useCmsPages = () => {
  return useQuery({
    queryKey: ["cmsPages"],
    queryFn: async () => {
      const res = await privateAxios.get<CmsPage[]>("/adomin/api/cms/pages");
      return res.data;
    },
  });
};
