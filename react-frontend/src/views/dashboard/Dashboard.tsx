import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import service from "@/api/dashboard";
export const Dashboard = () => {
  useEffect(() => {
    service.testProtect();
  }, []);
  return (
    <div className="w-full h-screen  text-gray-400 border rounded-lg">
      ssss
      <NavLink to="/user">user</NavLink>
    </div>
  );
};
