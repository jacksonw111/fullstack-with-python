import api from "@/utils/request";

export interface QueryUserRequest {
  email?: string;
  current_page: number;
  page_size: number;
}
export interface UserResponse {
  id: string;
  name: string;
  email: string;
  is_active: boolean;
}

export interface QueryUserResponse {
  total: number;
  users: UserResponse[];
}
class UserService {
  url = "/api/users";
  async query(params: QueryUserRequest) {
    const { data } = await api.get(this.url, { params });
    return data;
  }
}

export default new UserService();
