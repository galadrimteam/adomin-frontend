import { createContext, useContext } from "react";

interface MobileContextProps {
  showMenu: boolean;
  setShowMenu: (show: boolean) => void;
}

export const MobileContext = createContext<MobileContextProps | null>(null);

export const useMobileContext = () => {
  const res = useContext(MobileContext);

  if (res === null) {
    throw new Error(
      "useMobileContext must be used within a MobileContext.Provider"
    );
  }

  return res;
};
