import { useState } from "react";
import userService from "@/api/user";

export const User = () => {
  const [pagination, setPagination] = useState({
    current_page: 1,
    page_size: 10,
    total: 0,
  });

  return (
    <div className="w-1/2 h-screen bg-stone-500">
      {/* {state.loading ? (
        <div>加载中....</div>
      ) : state.error ? (
        <div>Error</div>
      ) : (
        <div>{state.value}</div>
      )} */}
      user
    </div>
  );
};
