import router from '@/router'
import api from '@/utils/request'
import axios from 'axios'
import { storeUserInfo, removeUserInfo } from './token'

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  user_id: string
  access_token: string
  refresh_token: string
}

class AuthService {
  TOKEN_URL = '/api/token'
  LOGOUT_URL = '/api/logout'
  REREFRESH_TOEKN_URL = '/api/refresh-token'

  async getUserInfo(request: LoginRequest): Promise<LoginResponse> {
    const { data } = await api({
      url: this.TOKEN_URL,
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      data: request
    })
    return data
  }

  async refreshToken(config: any, token_obj: any) {
    api
      .put(this.REREFRESH_TOEKN_URL, {
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

  async logout(): Promise<void> {
    await api.delete(this.LOGOUT_URL)
  }
}

export default new AuthService()
