import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import service from "@/api/dashboard";
export const Dashboard = () => {
  useEffect(() => {
    service.testProtect();
  }, []);
  return (
    <div className="w-56 h-56 bg-slate-600 text-gray-50 border border-gray-600 ">
      <NavLink to="/user">user</NavLink>
    </div>
  );
};
