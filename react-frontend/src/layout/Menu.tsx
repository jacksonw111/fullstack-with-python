import { useAppContext } from "@/AppContext";
import { MenuProps } from "./menus";
import classNames from "classnames";
import { BiChevronUp } from "react-icons/bi";
import { useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { NavLink, useLocation } from "react-router-dom";

const activeClass = "bg-indigo-700 text-gray-50";

const isActive = (menu: MenuProps) => {
  const local = useLocation();
  if (menu.children?.find((it) => it.path === local.pathname))
    return activeClass;
};

export const MenuItem = ({ menu }: { menu: MenuProps }) => {
  const { collapse } = useAppContext();
  return (
    <>
      <NavLink
        to={menu.path}
        className={({ isActive }) =>
          classNames(
            "flex items-center justify-start gap-2 w-full px-6 py-2.5 hover:bg-gray-300 rounded-lg cursor-pointer",
            collapse && "justify-center",
            isActive && activeClass
          )
        }
      >
        <span className="text-xl">{menu.icon}</span>
        <span className={classNames(collapse && "hidden")}>{menu.name}</span>
      </NavLink>
    </>
  );
};

const CollapsedSubMenu = ({ menu }: { menu: MenuProps }) => {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            asChild
            className="flex items-center justify-center gap-2 w-full  hover:bg-gray-300 rounded-lg cursor-pointer "
          >
            <div className={classNames("p-3", isActive(menu))}>{menu.icon}</div>
          </TooltipTrigger>
          <TooltipContent side="right">
            <TooltipArrow />
            <ul className="">
              {menu.children?.map((menu) => (
                <li>
                  <NavLink
                    to={menu.path}
                    className={({ isActive }) =>
                      classNames(
                        "flex items-center justify-start gap-2 w-full px-6 py-2.5 hover:bg-gray-300 rounded-lg cursor-pointer",
                        isActive && "text-indigo-700"
                      )
                    }
                  >
                    <span>{menu.icon}</span>
                    <span>{menu.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>{" "}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export const MenuWithSubItem = ({ menu }: { menu: MenuProps }) => {
  const { collapse } = useAppContext();
  const [expand, setExpand] = useState(false);
  const nodeRef = useRef(null);

  if (collapse) return <CollapsedSubMenu menu={menu} />;

  return (
    <div className="flex flex-col gap-2 w-full">
      <div
        className={classNames(
          "flex items-center justify-start pl-6 pr-1 py-2.5 gap-2 w-full hover:bg-gray-300 rounded-lg cursor-pointer",
          collapse && "justify-center",
          !expand && isActive(menu)
        )}
        onClick={() => setExpand(!expand)}
      >
        <span>{menu.icon}</span>
        <div
          className={classNames(
            "flex items-center grow justify-center w-full",
            collapse && "hidden"
          )}
        >
          <span className={classNames("grow pl-1")}>{menu.name}</span>
          <span>
            <BiChevronUp
              className={classNames(
                "transition-all duration-300 ease-in-out",
                !expand && "rotate-180"
              )}
            />
          </span>
        </div>
      </div>

      <CSSTransition
        nodeRef={nodeRef}
        in={expand}
        onEnter={() => setExpand(true)}
        onExit={() => setExpand(false)}
        timeout={300}
        classNames={{
          enter: "animate__animated animate__fadeIn",
          exit: "animate__animated animate__fadeOut",
        }}
        mountOnEnter
        unmountOnExit
      >
        <ul
          className={classNames("text-sm flex flex-col gap-2 pl-6")}
          ref={nodeRef}
        >
          {menu.children?.map((subMenu) => (
            <MenuItem menu={subMenu} key={subMenu.path} />
          ))}
        </ul>
      </CSSTransition>
    </div>
  );
};
