import { apiClient } from '@/utils/db';

export const authService = {
  async signIn(payload: any) { // 로그인
    return await apiClient('/auth/signIn', { method: 'POST', body: JSON.stringify(payload)})
  },
  async signInWithCredentials(email: string, password: string) { // 이메일/비밀번호 로그인
    return await apiClient('/auth/signIn/credentials', { method: 'POST', body: JSON.stringify({ email, password }) })
  },
  async rotateToken(refreshToken: string) { // accessToken 재발급
    return await apiClient('/auth/access', { method: 'POST', headers: { 'authorization': `Bearer ${refreshToken}` }})
  }
}