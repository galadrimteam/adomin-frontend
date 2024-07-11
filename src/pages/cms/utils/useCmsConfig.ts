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

export const useCmsBlocks = () => {
  return useQuery({
    queryKey: ["cmsBlocksConfig"],
    queryFn: async () => {
      const res = await privateAxios.get<Pick<CmsConfig, "blocks">>(
        "/adomin/api/cms/blocks"
      );
      return res.data;
    },
  });
};

export const useCmsLayouts = () => {
  return useQuery({
    queryKey: ["cmsLayoutsConfig"],
    queryFn: async () => {
      const res = await privateAxios.get<Pick<CmsConfig, "layouts">>(
        "/adomin/api/cms/layouts"
      );
      return res.data;
    },
  });
};
