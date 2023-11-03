import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { privateAxios } from "../../../axios/privateAxios";
import { notifySuccess } from "../../../errors/notifiySuccess";
import { ModelData, ModelFieldsConfig } from "../model.types";

interface Props {
  modelConfig: ModelFieldsConfig;
}

interface UpdateModelResponse {
  message: string;
  model: ModelData;
}

export const useUpdateModel = ({ modelConfig }: Props) => {
  const navigate = useNavigate();
  const updateMutation = useMutation({
    mutationFn: async (values: ModelData) => {
      const primaryKeyValue = values[modelConfig.primaryKey];
      const res = await privateAxios.put<UpdateModelResponse>(
        `/adomin/api/crud/${modelConfig.name}/${primaryKeyValue}`,
        values
      );

      return res.data;
    },
    onSuccess: () => {
      notifySuccess(`${modelConfig.label.toLocaleLowerCase()} mis à jour`);
      navigate(`/adomin/${modelConfig.name}`);
    },
  });

  const updateModel = async (values: ModelData) => {
    await updateMutation.mutateAsync(values);
  };

  return { updateModel, isLoading: updateMutation.isPending };
};
