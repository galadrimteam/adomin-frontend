import { useQuery } from "@tanstack/react-query";
import { privateAxios } from "../../../../axios/privateAxios";
import { CmsPage } from "../../utils/cms.types";

export const useShowPageQuery = (cmsPageId: string | number) => {
  return useQuery({
    queryKey: ["cmsPage", cmsPageId],
    queryFn: async () => {
      const res = await privateAxios.get<CmsPage>(
        `/adomin/api/cms/pages/${cmsPageId}`
      );
      return res.data;
    },
  });
};
