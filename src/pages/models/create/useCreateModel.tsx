import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getModelPath } from "../../../adominPaths";
import { privateAxios } from "../../../axios/privateAxios";
import { notifySuccess } from "../../../errors/notifiySuccess";
import { getFormData } from "../../../utils/getFormData";
import { ModelData, ModelFieldsConfig } from "../model.types";

interface Props {
  modelConfig: ModelFieldsConfig;
}

interface UpdateModelResponse {
  message: string;
  model: ModelData;
}

export const useCreateModel = ({ modelConfig }: Props) => {
  const navigate = useNavigate();
  const createMutation = useMutation({
    mutationFn: async (values: ModelData) => {
      const res = await privateAxios.post<UpdateModelResponse>(
        `/adomin/api/models/crud/${modelConfig.name}`,
        getFormData(values, modelConfig, "create")
      );

      return res.data;
    },
    onSuccess: () => {
      notifySuccess(`${modelConfig.label.toLocaleLowerCase()} créé`);
      const modelListPath = getModelPath({
        name: modelConfig.name,
        type: "list",
      });
      navigate(modelListPath);
    },
  });

  const createModel = async (values: ModelData) => {
    await createMutation.mutateAsync(values);
  };

  return { createModel, isLoading: createMutation.isPending };
};
