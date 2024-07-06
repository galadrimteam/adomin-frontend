import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { privateAxios } from "../../../axios/privateAxios";
import type { DeletePageModalProps } from "./DeletePageModal";

export const useDeletePage = (): DeletePageModalProps => {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const deleteRowMutation = useMutation({
    mutationFn: async (id: number | string) => {
      const res = await privateAxios.delete(`/adomin/api/cms/pages/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cmsPages"] });
    },
  });

  const handleDeleteRow = () => {
    if (!deleteId) return;

    deleteRowMutation.mutateAsync(deleteId).then(() => {
      setDeleteId(null);
    });
  };

  return {
    deleteRowMutationIsLoading: deleteRowMutation.isPending,
    handleDeleteRow,
    deleteId,
    setDeleteId,
  };
};
