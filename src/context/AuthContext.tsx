import { createContext, useState, ReactNode, useEffect, FC } from "react";
import toast from "react-hot-toast";
import * as api from "../api/api";
import { StorageKeys } from "../config/constants";
import { AuthState } from "../types";

export interface AuthContextType {
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const initialState = {
  loading: false,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext<AuthContextType>(initialState);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const token = localStorage.getItem(StorageKeys.ACCESS_TOKEN);
    setAuth((prev) => ({ ...prev, isAuthenticated: !!token, loading: false }));
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setAuth((prev) => ({
        ...prev,
        loading: true,
      }));
      const data = await api.login(email, password);
      localStorage.setItem(StorageKeys.ACCESS_TOKEN, data?.data?.token ?? "");
      setAuth({
        loading: false,
        error: data?.data?.message ?? "",
        isAuthenticated: !!data?.data?.token,
      });

      if (data.success) toast.success("You logged in successfully!");
      else toast.error(data?.data?.message ?? "Login failed!");
    } catch (error) {
      setAuth((prev) => ({
        ...prev,
        loading: false,
        isAuthenticated: false,
        error: "Login failed",
      }));
      toast.error("Login failed!");
    }
  };

  const logout = async () => {
    try {
      await api.logout();
      localStorage.removeItem(StorageKeys.ACCESS_TOKEN);
      setAuth({ isAuthenticated: false, loading: false, error: null });
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loading: auth.loading,
        isAuthenticated: auth.isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
