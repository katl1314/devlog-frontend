import { apiClient } from '@/utils/db';

export const authService = {
	/** 로그인 (OAuth 프로필 기반) */
	async signIn(payload: unknown) {
		return apiClient('/auth/signIn', {
			method: 'POST',
			body: JSON.stringify(payload)
		});
	},

	/** 이메일/비밀번호 로그인 */
	async signInWithCredentials(email: string, password: string) {
		return apiClient('/auth/signIn/credentials', {
			method: 'POST',
			body: JSON.stringify({ email, password })
		});
	},

	/** accessToken 재발급 (refreshToken을 Bearer로 전달) */
	async rotateToken(refreshToken: string) {
		return apiClient('/auth/access', {
			method: 'POST',
			accessToken: refreshToken
		});
	}
};
