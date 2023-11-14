import { QueryUserResponse } from "@/api/user";
import { useEffect, useMemo, useState } from "react";
import userService from "@/api/user";
import UserList from "./components/UserList";
import { PaginationState } from "@tanstack/react-table";

export const UserListView = () => {
  const [loading, setLoading] = useState(false);

  const [response, setResponse] = useState<QueryUserResponse>({
    total: 0,
    users: [],
  });

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  useEffect(() => {
    setLoading(true);
    userService
      .query({ current_page: pageIndex, page_size: pageSize })
      .then((res) => {
        setResponse(res);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, [pagination]);

  return (
    <div className="w-2/3 h-full bg-gray-50 shadow-lg p-3 m-auto">
      <UserList
        users={response.users}
        isLoading={loading}
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  );
};
