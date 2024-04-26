import { useContext } from "react";
import { GlobalContext, GlobalContextType } from "../context/GlobalContext";

export const useInfo = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useInfo must be used within an GlobalContext");
  }
  return context;
};
