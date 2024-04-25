import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import toast from 'react-hot-toast';
import { AuthState } from '../types';
import * as api from '../api/api';
import { StorageKeys } from '../config/constants';

interface AuthContextType {
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

const AuthContext = createContext<AuthContextType>(initialState);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const token = localStorage.getItem(StorageKeys.ACCESS_TOKEN);
    if (token) {
      setAuth((prev) => ({ ...prev, isAuthenticated: true, loading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = await api.login(email, password);
      localStorage.setItem(StorageKeys.ACCESS_TOKEN, data?.data?.token ?? '');
      setAuth({
        loading: false,
        error: data?.data?.message ?? '',
        isAuthenticated: !!data?.data?.token,
      });

      if (data.success) toast.success('You logged in successfully!');
      else toast.error(data?.data?.message ?? 'Login failed!');
    } catch (error) {
      setAuth((prev) => ({
        ...prev,
        loading: false,
        isAuthenticated: false,
        error: 'Login failed',
      }));
      toast.error('Login failed!');
    }
  };

  const logout = async () => {
    await api.logout();
    localStorage.removeItem('accessToken');
    setAuth({ isAuthenticated: false, loading: false, error: null });
  };

  return (
    <AuthContext.Provider
      value={{
        loading: auth.loading,
        isAuthenticated: auth.isAuthenticated,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
