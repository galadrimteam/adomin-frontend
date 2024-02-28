import { createContext, useContext } from "react";
import { FullStatViewConfig } from "./stat.types";

export const StatConfigContext = createContext<FullStatViewConfig | null>(null);

export const useStatConfig = () => {
  const context = useContext(StatConfigContext);
  if (!context) {
    throw new Error(
      "useStatConfig must be used within a StatConfigContext.Provider"
    );
  }
  return context;
};
