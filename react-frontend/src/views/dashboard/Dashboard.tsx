import { useEffect } from "react";
import service from "@/api/dashboard";
export const Dashboard = () => {
  useEffect(() => {
    service.testProtect();
  }, []);
  return (
    <div className="w-full h-screen  text-gray-400 border rounded-lg"></div>
  );
};
