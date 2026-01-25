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
  async find (cursor: any) {
    return await apiClient('/post', {
      method: 'GET',
      params: { cursor }
    })
  }
}