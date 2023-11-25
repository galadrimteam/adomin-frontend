import { createContext, useContext } from "react";
import { ModelFieldsConfig } from "./model.types";

export const ModelConfigContext = createContext<ModelFieldsConfig | null>(null);

export const useModelConfig = () => {
  const context = useContext(ModelConfigContext);
  if (!context) {
    throw new Error("useModelConfig must be used within a ModelConfigProvider");
  }
  return context;
};
