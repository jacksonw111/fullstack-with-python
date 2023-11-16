import { ReactNode } from "react";
import { BiCog, BiSolidDashboard, BiUser } from "react-icons/bi";
export interface MenuProps {
  name: string;
  path: string;
  icon: ReactNode;
  children?: MenuProps[];
}
export const menus = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <BiSolidDashboard />,
  },
  {
    name: "User",
    path: "/user",
    icon: <BiUser />,
  },
  {
    name: "User",
    path: "/user",
    icon: <BiUser />,
  },
  {
    name: "User",
    path: "/user",
    icon: <BiUser />,
  },
  {
    name: "User",
    path: "/user",
    icon: <BiUser />,
  },
  {
    name: "User",
    path: "/user",
    icon: <BiUser />,
  },
  {
    name: "Users",
    path: "/settings",
    icon: <BiCog />,
    children: [
      {
        name: "settings1",
        path: "/settings/1",
        icon: <BiSolidDashboard />,
      },
      {
        name: "settings2",
        path: "/settings/2",
        icon: <BiSolidDashboard />,
      },
      {
        name: "settings3",
        path: "/settings/3",
        icon: <BiSolidDashboard />,
      },
      {
        name: "settings4",
        path: "/settings/4",
        icon: <BiSolidDashboard />,
      },
    ],
  },
  {
    name: "User2",
    path: "/user2",
    icon: <BiUser />,
  },
];
