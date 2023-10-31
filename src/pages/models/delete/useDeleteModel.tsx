import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { privateAxios } from "../../../axios/privateAxios";
import { ModelData } from "../model.types";

interface Props {
  modelName: string;
}

export const useDeleteModel = ({ modelName }: Props) => {
  // should be string | number | null, but can't be sure of that
  const [deleteId, setDeleteId] = useState<unknown>(null);
  const queryClient = useQueryClient();

  const deleteRowMutation = useMutation(
    async (id: number | string) => {
      const res = await privateAxios.delete(
        `/adomin/api/crud/${modelName}/${id}`
      );
      return res.data;
    },
    {
      onSuccess: ({ id }: { id: unknown }) => {
        queryClient.setQueryData<ModelData[] | undefined>(
          ["models", modelName],
          (oldData) => {
            if (!oldData || oldData instanceof Array === false) return oldData;
            if (typeof id !== "number" && typeof id !== "string") {
              return oldData;
            }

            return oldData.filter((row) => row.id !== deleteId);
          }
        );
      },
    }
  );

  const handleDeleteRow = () => {
    if (typeof deleteId !== "number" && typeof deleteId !== "string") return;
    deleteRowMutation.mutateAsync(deleteId).then(() => {
      setDeleteId(null);
    });
  };

  return {
    deleteRowMutationIsLoading: deleteRowMutation.isLoading,
    handleDeleteRow,
    deleteId,
    setDeleteId,
  };
};
