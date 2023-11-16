import { LayoutContent } from "./LayoutContent";
import { LayoutHeader } from "./LayoutHeader";
import { LayoutSidebar } from "./LayoutSidebar";

export const Layout = () => {
  return (
    <div className="w-screen h-screen flex">
      <LayoutSidebar />
      <div className="w-full h-screen overflow-auto">
        <LayoutHeader />
        <div className="w-full h-full p-3 overflow-auto">
          <LayoutContent />
        </div>
      </div>
    </div>
  );
};
