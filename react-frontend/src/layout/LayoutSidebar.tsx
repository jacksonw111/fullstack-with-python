import { BiChevronRight } from "react-icons/bi";
import classNames from "classnames";

import { appConfig } from "@/config";
import { useAppContext } from "@/AppContext";
import logo from "@/assets/logo.png";
import { menus } from "./menus";
import { MenuItem, MenuWithSubItem } from "./Menu";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const LayoutSidebar = () => {
  const { collapse, theme, setTheme, toggle } = useAppContext();
  return (
    <nav
      className={classNames(
        "h-screen py-2.5 px-3 z-100 shadow transition-all duration-500 ease-in-out flex flex-col",
        collapse ? "w-20" : "w-64"
      )}
    >
      <header className="relative top-0 left-0 h-20">
        <div
          className={classNames(
            "flex gap-2 items-center w-full h-full",
            collapse ? " justify-center" : "justify-start p-3"
          )}
        >
          <div className="mt-1">
            {/* logo  */}
            <span>
              <img src={logo} alt="logo" className="h-10 w-10 rounded-lg " />
            </span>
          </div>
          <div
            className={classNames(
              "flex flex-col transition-all duration-500 ease-in-out",
              collapse && "hidden"
            )}
          >
            {/* logo text */}
            <span className="font-medium text-lg">{appConfig.name}</span>
            <span className="text-xs text-gray-500">
              {appConfig.description}
            </span>
          </div>
        </div>
        <BiChevronRight
          className={classNames(
            "bg-indigo-700 shadow-2xl translate-y-2/3 text-gray-50 rounded-xl text-2xl cursor-pointer transition-all duration-300 ease-in absolute top-3 -right-6 z-100",
            collapse ? "rotate-180" : "rotate-0"
          )}
          onClick={toggle}
        />
      </header>
      <div className="mt-3 w-full overflow-auto grow">
        <div className="w-full h-full">
          <ul className="flex flex-col gap-2">
            {menus.map((menu) => (
              <li key={menu.path} className="">
                {menu.children ? (
                  <MenuWithSubItem menu={menu} />
                ) : (
                  <MenuItem menu={menu} />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mb-10 self-center">
        <div className="flex items-center space-x-2">
          <Switch
            id="airplane-mode"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          />
          <Label
            htmlFor="airplane-mode"
            className={classNames(collapse && "hidden")}
          >
            {theme} Mode
          </Label>
        </div>
      </div>
    </nav>
  );
};
