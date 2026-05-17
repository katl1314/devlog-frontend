import { apiClient } from '@/utils/db';

export const authService = {
	/** 로그인 (OAuth 프로필 기반) — provider는 대문자 enum 값(GOOGLE/GITHUB). 없으면 backend에서 검증 스킵 */
	async signIn(payload: Record<string, unknown> & { provider?: string }) {
		return apiClient('/auth/signIn', {
			method: 'POST',
			body: JSON.stringify(payload)
		});
	},

	/** 이메일/비밀번호 로그인 */
	async signInWithCredentials(email: string, password: string) {
		const token = Buffer.from(`${email}:${password}`).toString('base64');
		return apiClient('/auth/signIn/credentials', {
			method: 'POST',
			headers: { Authorization: `Basic ${token}` }
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
