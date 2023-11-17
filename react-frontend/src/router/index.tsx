import { RequireAuth } from "@/AuthContext";
import { Layout } from "../layout/Layout";
import { Dashboard } from "../views/dashboard/Dashboard";
import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import { UserListView } from "@/views/user/UserListView";
import { SettingsView } from "@/views/settings/SettingsView";
import { NotFound } from "@/views/error/NotFound";
import { Video } from "@/views/video/Video";
import { Editor } from "@/views/editor/Editor";
import { Upload } from "@/views/upload/Upload";
export const lazyLoad = (moduleName: string) => {
  const Module = lazy(() => import(moduleName));
  return <Module />;
};

const Login = lazy(() => import("@/views/login/Login"));
// const Dashboard = lazy(() => import("@/views/dashboard/Dashboard"));

export const routes = createBrowserRouter([
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
            <Dashboard />
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
      {
        path: "video",
        element: (
          <RequireAuth>
            <Video />
          </RequireAuth>
        ),
      },
      {
        path: "editor",
        element: (
          <RequireAuth>
            <Editor />
          </RequireAuth>
        ),
      },
      {
        path: "upload",
        element: (
          <RequireAuth>
            <Upload />
          </RequireAuth>
        ),
      },
      {
        path: "settings",
        children: [
          {
            index: true,
            element: (
              <RequireAuth>
                <SettingsView />
              </RequireAuth>
            ),
          },
          {
            path: "1",
            element: <SettingsView />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
