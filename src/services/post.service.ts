import { apiClient } from '@/utils/db';

export const postService = {
  async create(post: any, accessToken: string) { // 포스트 생성
    // const session = (await auth()) as Session & { accessToken: string };
    return await apiClient('/post', {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(post)
    });
  },
  async getList(cursor: any) {
    return await apiClient('/post', {
      method: 'GET',
      params: { cursor }
    })
  },
  async findPost(userId: string, path: string) {
    return await apiClient(`/post/${userId}/${path}`, {
      method: 'GET',
    })
  }
}