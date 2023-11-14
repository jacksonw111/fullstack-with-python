import { RequireAuth } from "@/AuthContext";
import { Layout } from "../layout/Layout";
import { Dashboard } from "../views/dashboard/Dashboard";
// import { User } from "../views/user/UserListView";
import { RouteObject } from "react-router-dom";
import { lazy } from "react";
import { UserListView } from "@/views/user/UserListView";

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
            <UserListView />
          </RequireAuth>
        ),
      },
    ],
  },
];
