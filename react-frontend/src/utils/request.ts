import axios, { type AxiosInstance, type AxiosResponse } from "axios";
import qs from "qs";
import { fetachUserInfo } from "./token";
import authService from "@/utils/auth";
import { useNavigate } from "react-router-dom";

const baseURL = import.meta.env.BASE_URL;
const requestTimeout = 6000;
// const navigation = useNavigate();

export interface HttpResponse<T = unknown> {
  status: number;
  msg: string;
  code: number;
  data: T;
}

const api: AxiosInstance = axios.create({
  baseURL,
  timeout: requestTimeout,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = fetachUserInfo();
    if (token) {
      const token_obj: any = token;
      config.headers["Authorization"] = `bearer ${token_obj["access_token"]}`;
    }
    if (
      config.data &&
      config.headers["Content-Type"] ===
        "application/x-www-form-urlencoded;charset=UTF-8"
    )
      config.data = qs.stringify(config.data);

    return config;
  },
  (error) => Promise.reject(error)
);
api.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    const res = response;
    const url = response.config.url;
    if (url?.includes("download")) {
      response.headers.responseType = "blob";
    }
    return res;
  },
  (error: any) => {
    const { config } = error;
    if (error.response.status === 401) {
      const token = fetachUserInfo();
      if (token) {
        const token_obj = token;
        authService.refreshToken(config, token_obj);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
