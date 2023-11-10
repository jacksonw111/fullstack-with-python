import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
} from "react";

export const AppContext = createContext({});
export const useAppContext = () => useContext(AppContext);
export const AppContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const value = useMemo(() => ({}), []);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
