import { useQuery } from "react-query";
import privateAxios from "../../../axios/privateAxios";
import { ModelData } from "../model.types";

interface Props {
  modelName: string;
}

export const useModelsListQuery = ({ modelName }: Props) => {
  const listQuery = useQuery(["models", modelName], async () => {
    const res = await privateAxios.get<ModelData[]>(
      `/adomin/api/crud/${modelName}`
    );
    return res.data;
  });

  return { listQuery };
};
