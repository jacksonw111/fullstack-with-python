import { RequireAuth } from "@/AuthContext";
import { Layout } from "../layout/Layout";
import { Dashboard } from "../views/dashboard/Dashboard";
import { User } from "../views/user/User";
import { RouteObject } from "react-router-dom";
import { lazy } from "react";

const Login = lazy(() => import("@/views/login/Login"));

export const routes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "dashboard",
        element: (
          <RequireAuth>
            <Dashboard />,
          </RequireAuth>
        ),
      },
      {
        path: "user",
        element: (
          <RequireAuth>
            <User />
          </RequireAuth>
        ),
      },
    ],
  },
];
