import { createContext, useState, ReactNode, useEffect, FC } from "react";
import toast from "react-hot-toast";
import * as api from "../api/api";

export interface GlobalContextType {
  loading: boolean;
  info: string;
  getInfo?: () => void;
}

const initialState = {
  loading: true,
  info: "",
  getInfo: () => {},
};

export const GlobalContext = createContext<GlobalContextType>(initialState);

export const GlobalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(true);

  const getInfo = async () => {
    try {
      const infoRes = await api.fetchInfo();
      if (infoRes.success) {
        setInfo(infoRes?.data?.info ?? "");
      }
    } catch (error) {
      toast.error("Fetch Info failed!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  return <GlobalContext.Provider value={{ loading, info, getInfo }}>{children}</GlobalContext.Provider>;
};
