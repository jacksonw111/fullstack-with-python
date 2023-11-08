import axios, { type AxiosInstance, type AxiosResponse } from 'axios'
import qs from 'qs'
import router from '@/router'
import { fetachUserInfo, removeUserInfo, storeUserInfo } from './token'

const baseURL = import.meta.env.BASE_URL
const requestTimeout = 6000
const REREFRESH_TOEKN_URL = '/api/refresh-token'

export interface HttpResponse<T = unknown> {
  status: number
  msg: string
  code: number
  data: T
}

const api: AxiosInstance = axios.create({
  baseURL,
  timeout: requestTimeout,
  headers: {
    'Content-Type': 'application/json'
  }
})

function refreshToken(config: any, token_obj: any) {
  axios
    .put(REREFRESH_TOEKN_URL, {
      user_id: token_obj['user_id'],
      access_token: token_obj['access_token'],
      refresh_token: token_obj['refresh_token']
    })
    .then((res) => {
      // localStorage.setItem(TOKEN, JSON.stringify(res.data))
      storeUserInfo(res.data)
      const newAccessToken = res.data['access_token']
      config.headers.Authorization = `Bearer ${newAccessToken}`
      return axios(config) //重新发送请求
    })
    .catch(() => {
      if (router.currentRoute.value.name != 'login') {
        removeUserInfo()
        router.push({ name: 'login' })
      }
    })
}

api.interceptors.request.use(
  (config) => {
    const token = fetachUserInfo()
    if (token) {
      const token_obj = JSON.parse(token)
      config.headers['Authorization'] = `bearer ${token_obj['access_token']}`
    }
    if (
      config.data &&
      config.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=UTF-8'
    )
      config.data = qs.stringify(config.data)

    return config
  },
  (error) => Promise.reject(error)
)
api.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    const res = response
    const url = response.config.url
    if (url?.includes('download')) {
      response.headers.responseType = 'blob'
    }
    return res
  },
  (error: any) => {
    const { config } = error
    console.error('error1111')
    if (error.response.status == 401) {
      console.error('401')
      const token = fetachUserInfo()
      if (token) {
        const token_obj = JSON.parse(token)
        refreshToken(config, token_obj)
      } else {
        router.push({ name: 'login' })
      }
    }
    return Promise.reject(error)
  }
)

export default api
