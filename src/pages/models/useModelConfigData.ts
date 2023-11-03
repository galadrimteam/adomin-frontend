import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { ModelFieldsConfig } from "./model.types";

export const useModelConfigData = () => {
  const { model } = useParams<{ model: string }>();
  const queryClient = useQueryClient();

  const configData = queryClient.getQueryData<ModelFieldsConfig>([
    "modelParams",
    model,
  ]);

  return configData;
};
