import { apiClient } from '@/utils/db';

export const postService = {
  async create(post: any, accessToken: string) { // 포스트 생성
    return await apiClient('/post', {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(post)
    });
  },
  async getList(cursor: any, accessToken?: string) {
    return await apiClient('/post', {
      method: 'GET',
      params: { cursor },
      headers: accessToken ? { authorization: `Bearer ${accessToken}` } : undefined,
    })
  },
  async getListByUser(userId: string, cursor: any, accessToken?: string) {
    return await apiClient('/post', {
      method: 'GET',
      params: { userId, cursor },
      headers: accessToken ? { authorization: `Bearer ${accessToken}` } : undefined,
    })
  },
  async findPost(postId: string, userId: string, accessToken?: string) {
    return await apiClient(`/post/${userId}/${postId}`, {
      method: 'GET',
      headers: accessToken ? { authorization: `Bearer ${accessToken}` } : undefined,
    })
  },
  async findLikeById(postId: string, accessToken: string) {
    return await apiClient(`/post/${postId}/like/me`, {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${accessToken}`
      }
    })
  },
  async like(postId: number, isLiked: boolean, accessToken: string) {
    const action = `/post/${postId}/like`;
    return await apiClient(action, {
      method: isLiked ? 'POST' : 'DELETE',
      headers: {
        'authorization': `Bearer ${accessToken}`,
      },
    });
  }
}