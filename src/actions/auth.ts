'use server';
import { auth, signIn, signOut } from '@/auth';

// 로그인 서버 액션

export const signInWithCredentials = async (formData: FormData) => {
	await signIn('credentials', {
		displayName: formData.get('displayName') || '', // `'null'` 문자 방지
		email: formData.get('email') || '',
		password: formData.get('password') || ''
		// redirectTo: '/' // 로그인 후 메인 페이지로 이동!
	});
};
export const signOutWithForm = async (formData: FormData) => {
	await signOut();
};

export { auth as getSession };
