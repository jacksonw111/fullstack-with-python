import { NavLink } from "react-router-dom";

export const User = () => {
  return (
    <div className="w-56 h-56 bg-slate-600 text-gray-50 border border-gray-600 ">
      <NavLink to="/dashboard"> dashboard</NavLink>
    </div>
  );
};
