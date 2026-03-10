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
  async getList(cursor: any) {
    return await apiClient('/post', {
      method: 'GET',
      params: { cursor }
    })
  },
  async findPost(userId: string, postId: string) {
    return await apiClient(`/post/${userId}/${postId}`, {
      method: 'GET',
    })
  },
  async findPostLikeById(userId: string, postId: string) {
    return await apiClient(`/post/like/${postId}/${userId}`, {
      method: 'GET',
    })
  },
  async like(postId: number, isLiked: boolean, accessToken: string) {
    const action = `/post/like/${postId}`;
    return await apiClient(action, {
      method: isLiked ? 'POST' : 'DELETE',
      headers: {
        'authorization': `Bearer ${accessToken}`,
      },
    });
  }
}