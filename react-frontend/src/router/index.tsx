import { RequireAuth } from "@/AuthContext";
import { Layout } from "../layout/Layout";
import { Dashboard } from "../views/Dashboard";
import { User } from "../views/User";
import { Login } from "@/views/Login";

export const routes = [
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
