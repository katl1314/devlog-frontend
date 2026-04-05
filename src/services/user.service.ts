import { apiClient } from '@/utils/db';

export const userService = {
  async has(email: string) {
    return await apiClient(`/auth/users/${encodeURIComponent(email)}/exists`, { method: 'GET' });
  },
  async create(user: any) {
    return await apiClient('/auth/users', { method: 'POST', body: JSON.stringify(user) });
  },
  async findAll() { // 모든 사용자 조회
    return await apiClient('/auth/users', { method: 'GET', headers: { 'cache': 'no-store' } });
  },
  async findUserByEmail(email: string) {
    return await apiClient(`/auth/users/email/${email}`, { method: 'GET', headers: { 'cache': 'no-store' } });
  },
  async findUserById(id: string) {
    return await apiClient(`/auth/users/${id}`, { method: 'GET', headers: { 'cache': 'no-store' } });
  },
  async update(id: string, data: Record<string, unknown>, token: string) {
    return await apiClient(`/auth/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  async getSettings(id: string, token: string) {
    return await apiClient(`/auth/users/${id}/settings`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}`, cache: 'no-store' },
    });
  },
  async updateSettings(id: string, data: Record<string, unknown>, token: string) {
    return await apiClient(`/auth/users/${id}/settings`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}