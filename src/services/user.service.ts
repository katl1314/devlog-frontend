import { apiClient } from '@/utils/db';

export const userService = {
	/** 이메일 가입 여부 확인 */
	async has(email: string) {
		return apiClient(`/auth/users/${encodeURIComponent(email)}/exists`, {
			method: 'GET'
		});
	},

	/** 회원가입 (유저 + 블로그 생성) */
	async create(user: unknown) {
		return apiClient('/auth/users', {
			method: 'POST',
			body: JSON.stringify(user)
		});
	},

	/** 전체 사용자 목록 조회 */
	async findAll() {
		return apiClient('/auth/users', {
			method: 'GET',
			headers: { cache: 'no-store' }
		});
	},

	/** 이메일로 사용자 조회 */
	async findUserByEmail(email: string) {
		return apiClient(`/auth/users/email/${email}`, {
			method: 'GET',
			headers: { cache: 'no-store' }
		});
	},

	/** user_id로 사용자 조회 */
	async findUserById(id: string) {
		return apiClient(`/auth/users/${id}`, {
			method: 'GET',
			headers: { cache: 'no-store' }
		});
	},

	/** 프로필 업데이트 (인증 필수) */
	async update(id: string, data: Record<string, unknown>, accessToken: string) {
		return apiClient(`/auth/users/${id}`, {
			method: 'PATCH',
			body: JSON.stringify(data),
			accessToken
		});
	},

	/** 앱 설정 조회 (인증 필수) */
	async getSettings(id: string, accessToken: string) {
		return apiClient(`/auth/users/${id}/settings`, {
			method: 'GET',
			headers: { cache: 'no-store' },
			accessToken
		});
	},

	/** 앱 설정 업데이트 (인증 필수) */
	async updateSettings(
		id: string,
		data: Record<string, unknown>,
		accessToken: string
	) {
		return apiClient(`/auth/users/${id}/settings`, {
			method: 'PATCH',
			body: JSON.stringify(data),
			accessToken
		});
	},

	/** 팔로우 상태 조회 (인증 필수) */
	async getFollowStatus(targetUserId: string, accessToken: string): Promise<{ following: boolean }> {
		return apiClient(`/auth/users/${targetUserId}/follow/status`, {
			method: 'GET',
			accessToken
		});
	},

	/** 팔로워/팔로잉 수 조회 */
	async getFollowCounts(userId: string): Promise<{ followerCount: number; followingCount: number }> {
		return apiClient(`/auth/users/${userId}/follow/counts`, {
			method: 'GET'
		});
	},

	/** 팔로우 (인증 필수) */
	async follow(targetUserId: string, accessToken: string): Promise<{ following: boolean }> {
		return apiClient(`/auth/users/${targetUserId}/follow`, {
			method: 'POST',
			accessToken
		});
	},

	/** 언팔로우 (인증 필수) */
	async unfollow(targetUserId: string, accessToken: string): Promise<{ following: boolean }> {
		return apiClient(`/auth/users/${targetUserId}/follow`, {
			method: 'DELETE',
			accessToken
		});
	},

	/** 팔로워 목록 조회 */
	async getFollowers(userId: string): Promise<{ user_id: string; user_name: string; avatar_url: string }[]> {
		return apiClient(`/auth/users/${userId}/followers`, { method: 'GET' });
	},

	/** 팔로잉 목록 조회 */
	async getFollowings(userId: string): Promise<{ user_id: string; user_name: string; avatar_url: string }[]> {
		return apiClient(`/auth/users/${userId}/followings`, { method: 'GET' });
	}
};
