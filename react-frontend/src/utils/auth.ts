import axios from "axios";
import { removeUserInfo, storeUserInfo } from "./token";
import { useLocation, useNavigate } from "react-router-dom";
import api from "./request";

// const REREFRESH_TOEKN_URL = "/api/refresh-token";

// export const refreshToken = (config: any, token_obj: any) => {
//   const path = useLocation();
//   const navigate = useNavigate();

//   axios
//     .put(REREFRESH_TOEKN_URL, {
//       user_id: token_obj["user_id"],
//       access_token: token_obj["access_token"],
//       refresh_token: token_obj["refresh_token"],
//     })
//     .then((res) => {
//       // localStorage.setItem(TOKEN, JSON.stringify(res.data))
//       storeUserInfo(res.data);
//       const newAccessToken = res.data["access_token"];
//       config.headers.Authorization = `Bearer ${newAccessToken}`;
//       return axios(config); //重新发送请求
//     })
//     .catch(() => {
//       if (path.pathname != "/login") {
//         removeUserInfo();
//         navigate("/login");
//       }
//     });
// };

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  user_id: string;
  access_token: string;
  refresh_token: string;
}

class AuthService {
  TOKEN_URL = "/api/token";
  logoutUrl = "/api/logout";
  REREFRESH_TOEKN_URL = "/api/refresh-token";

  async getTokenInfo(request: LoginRequest): Promise<LoginResponse> {
    const { data } = await api({
      url: this.TOKEN_URL,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      data: request,
    });

    return data;
  }

  async refreshToken(config: any, token_obj: any) {
    // const path = useLocation();
    // const navigate = useNavigate();

    api
      .put(this.REREFRESH_TOEKN_URL, {
        user_id: token_obj["user_id"],
        access_token: token_obj["access_token"],
        refresh_token: token_obj["refresh_token"],
      })
      .then((res) => {
        // localStorage.setItem(TOKEN, JSON.stringify(res.data))
        storeUserInfo(res.data);
        const newAccessToken = res.data["access_token"];
        config.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(config); //重新发送请求
      })
      .catch((error) => {
        if (error.response.status !== 404) removeUserInfo();
      });
  }
  async logout(): Promise<void> {
    await api.delete(this.logoutUrl);
  }
}

export default new AuthService();
