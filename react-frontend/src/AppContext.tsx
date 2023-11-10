import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

type Theme = "dark" | "light" | "system";
const defaultTheme = "system";
interface AppGlobalProps {
  theme: string;
  setTheme: (theme: string) => void;
}

export const AppContext = createContext<AppGlobalProps>({
  theme: "system",
  setTheme: () => null,
});

export const useAppContext = () => useContext(AppContext);
export const AppContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<string>(
    () => (localStorage.getItem("THEME") as Theme) || defaultTheme
  );

  const value = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme]
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
