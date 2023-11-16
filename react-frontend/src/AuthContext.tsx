import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
} from "react";

import authService, { LoginRequest } from "@/utils/auth";
import { fetachUserInfo, removeUserInfo, storeUserInfo } from "@/utils/token";
import { Navigate, useLocation } from "react-router-dom";

interface AuthContextType {
  authenticated: () => boolean;
  signin: (user: LoginRequest, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

export const AuthContext = createContext({} as AuthContextType);
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const authenticated = () => {
    const user = fetachUserInfo();
    if (user) return true;
    else return false;
  };
  const signin = (request: LoginRequest, callback: VoidFunction) => {
    authService
      .getTokenInfo(request)
      .then((res) => {
        storeUserInfo(res);
        callback();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const signout = () => {
    authService.logout().then(() => {
      removeUserInfo();
    });
  };

  const value = useMemo(
    () => ({
      authenticated,
      signin,
      signout,
    }),
    []
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const RequireAuth: FC<PropsWithChildren> = ({ children }) => {
  const auth = useAuthContext();
  const location = useLocation();

  // 如果找不到 user 并且不在 login 页面, 自动跳转到 login
  if (!auth.authenticated() && location.pathname != "/login") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  
  return children;
};
