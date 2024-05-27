import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { privateAxios } from "../../../axios/privateAxios";

interface Props {
  modelName: string;
}

export const useDeleteModel = ({ modelName }: Props) => {
  // should be string | number | null, but can't be sure of that
  const [deleteId, setDeleteId] = useState<unknown>(null);
  const queryClient = useQueryClient();

  const deleteRowMutation = useMutation({
    mutationFn: async (id: number | string) => {
      const res = await privateAxios.delete(
        `/adomin/api/models/crud/${modelName}/${id}`
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["models", modelName] });
    },
  });

  const handleDeleteRow = () => {
    if (typeof deleteId !== "number" && typeof deleteId !== "string") return;
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
