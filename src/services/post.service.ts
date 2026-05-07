import { isEmpty } from '@/utils';
import { apiClient } from '@/utils/db';

/**
 * 포스트 경로 식별자 (`/:userId/:path` 조합).
 * `postId`처럼 단일 문자열로 받을 경우 동일 타입 파라미터 순서 실수가 생기므로 묶어서 받는다.
 */
export interface PostRef {
	userId: string;
	path: string;
}

export const postService = {
	/** 포스트 생성 (인증 필수, 트랜잭션) */
	async create(post: unknown, accessToken: string) {
		return apiClient('/post', {
			method: 'POST',
			accessToken,
			body: JSON.stringify(post)
		});
	},

	/** 포스트 삭제 (인증 필수, 본인만 가능) */
	async delete(postId?: number, accessToken?: string) {
		if (isEmpty(postId)) return;

		return apiClient(`/post/${postId}`, {
			method: 'DELETE',
			accessToken
		});
	},

	/** 포스트 목록 조회 (커서 페이지네이션) */
	async getList(cursor: number, accessToken?: string) {
		return apiClient('/post', {
			method: 'GET',
			params: { cursor: String(cursor) },
			accessToken
		});
	},

	/** 특정 사용자의 포스트 목록 조회 */
	async getListByUser(userId: string, cursor: number, accessToken?: string) {
		return apiClient('/post', {
			method: 'GET',
			params: { userId, cursor: String(cursor) },
			accessToken
		});
	},

	/** 단일 포스트 조회 (인증 선택) */
	async findPost({ userId, path }: PostRef, accessToken?: string) {
		return apiClient(`/post/${userId}/${path}`, {
			method: 'GET',
			accessToken
		});
	},

	/** 현재 사용자의 좋아요 여부 조회 */
	async findLikeById(postId: number | string, accessToken: string) {
		return apiClient(`/post/${postId}/like/me`, {
			method: 'GET',
			accessToken
		});
	},

	/** 좋아요 등록/취소 */
	async like(postId: number, isLiked: boolean, accessToken: string) {
		return apiClient(`/post/${postId}/like`, {
			method: isLiked ? 'POST' : 'DELETE',
			accessToken
		});
	},

	/** 팔로잉 피드 조회 (인증 필수) */
	async getFollowingFeed(cursor: number, accessToken: string) {
		return apiClient('/post/following', {
			method: 'GET',
			params: { cursor: String(cursor) },
			accessToken
		});
	}
};
