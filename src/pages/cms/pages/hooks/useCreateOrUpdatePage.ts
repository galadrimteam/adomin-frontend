import { useMutation } from "@tanstack/react-query";
import { NavigateFunction } from "react-router-dom";
import { ADOMIN_CMS_PAGES_PATH } from "../../../../adominPaths";
import { privateAxios } from "../../../../axios/privateAxios";
import { notifySuccess } from "../../../../errors/notifiySuccess";
import { CmsPage } from "../../utils/cms.types";

export type PageDto = Omit<CmsPage, "views" | "created_at" | "updated_at">;

export const useCreateOrUpdatePage = (
  mode: "create" | "update",
  navigate: NavigateFunction
) => {
  const updateMutation = useMutation({
    mutationFn: async (data: PageDto) => {
      if (mode === "create") {
        const res = await privateAxios.post<{ message: string; page: CmsPage }>(
          `/adomin/api/cms/pages`,
          data
        );
        return res.data;
      }

      const res = await privateAxios.put<{ message: string; page: CmsPage }>(
        `/adomin/api/cms/pages/${data.id}`,
        data
      );

      return res.data;
    },
    onSuccess: ({ page }) => {
      if (mode === "create") {
        notifySuccess("La page a bien été créée");
        navigate(`${ADOMIN_CMS_PAGES_PATH}/${page.id}`);
      } else {
        notifySuccess("La page a bien été mise à jour");
      }
    },
  });

  return updateMutation;
};
