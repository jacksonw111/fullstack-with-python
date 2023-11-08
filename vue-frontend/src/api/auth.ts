import api from '@/utils/request'

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
  getTokenUrl = '/api/token'
  logoutUrl = '/api/logout'
  async getUserInfo(request: LoginRequest): Promise<LoginResponse> {
    const { data } = await api({
      url: this.getTokenUrl,
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      data: request
    })
    return data
  }

  async logout(): Promise<void> {
    await api.delete(this.logoutUrl)
  }
}

export default new AuthService()
