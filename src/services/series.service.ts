import { apiClient } from '@/utils/db';

export interface Series {
	id: string;
	user_id: string;
	name: string;
	description: string | null;
	thumbnail: string | null;
	created_at: string;
	updated_at: string;
}

export const seriesService = {
	/** 유저 시리즈 목록 */
	async findByUserId(userId: string): Promise<Series[]> {
		return apiClient(`/series/user/${userId}`, { method: 'GET' });
	},

	/** 시리즈 상세 */
	async findOne(id: string): Promise<Series> {
		return apiClient(`/series/${id}`, { method: 'GET' });
	},

	/** 시리즈 내 포스트 목록 */
	async findPosts(id: string) {
		return apiClient(`/series/${id}/posts`, { method: 'GET' });
	},

	/** 시리즈 생성 */
	async create(
		data: { name: string; description?: string; thumbnail?: string },
		accessToken: string
	): Promise<Series> {
		return apiClient('/series', {
			method: 'POST',
			body: JSON.stringify(data),
			accessToken
		});
	},

	/** 시리즈 수정 */
	async update(
		id: string,
		data: { name?: string; description?: string; thumbnail?: string },
		accessToken: string
	): Promise<Series> {
		return apiClient(`/series/${id}`, {
			method: 'PATCH',
			body: JSON.stringify(data),
			accessToken
		});
	},

	/** 시리즈 삭제 */
	async remove(id: string, accessToken: string): Promise<void> {
		return apiClient(`/series/${id}`, {
			method: 'DELETE',
			accessToken
		});
	}
};
