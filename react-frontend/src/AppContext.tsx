import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Theme = "dark" | "light" | "system";
const defaultTheme = "system";
interface AppGlobalProps {
  theme: string;
  setTheme: (theme: string) => void;
  collapse: boolean;
  toggle: () => void;
}

export const AppContext = createContext<AppGlobalProps>({
  theme: "system",
  setTheme: () => null,
  collapse: false,
  toggle: () => null,
});

export const useAppContext = () => useContext(AppContext);
export const AppContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<string>(
    () => (localStorage.getItem("THEME") as Theme) || defaultTheme
  );
  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const [collapse, setCollase] = useState(false);
  const toggle = () => setCollase(!collapse);
  const value = useMemo(
    () => ({
      theme,
      collapse,
      toggle,
      setTheme,
    }),
    [collapse, theme]
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
