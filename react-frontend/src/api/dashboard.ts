import api from '@/utils/request'

class DashboardService {
  url = '/api/test-protect'
  async testProtect(): Promise<any> {
    const { data } = await api.get(this.url)
    return data
  }
}

export default new DashboardService()
