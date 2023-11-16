import { useEffect, useMemo, useState } from "react";
import { PaginationState } from "@tanstack/react-table";

import { QueryUserResponse } from "@/api/user";
import userService from "@/api/user";
import UserList from "./components/UserList";

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
      .catch(() => {
        setLoading(false);
      });
  }, [pagination]);

  return (
    <div>
      <UserList
        users={response.users}
        isLoading={loading}
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  );
};
