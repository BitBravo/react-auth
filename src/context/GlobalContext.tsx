import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import toast from 'react-hot-toast';
import * as api from '../api/api';

interface GlobalContextType {
  loading: boolean;
  info: string;
  getInfo?: () => void;
}

const initialState = {
  loading: true,
  info: '',
  getInfo: () => {},
};

export const GlobalContext = createContext<GlobalContextType>(initialState);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(true);

  const getInfo = async () => {
    try {
      const infoRes = await api.fetchInfo();
      if (infoRes.success) {
        setInfo(infoRes?.data?.info ?? '');
      }
    } catch (error) {
      toast.error('Fetch Info failed!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <GlobalContext.Provider value={{ loading, info, getInfo }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useInfo = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useInfo must be used within an GlobalContext');
  }
  return context;
};
