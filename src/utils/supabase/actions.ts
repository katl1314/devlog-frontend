'use server';

import { Provider } from '@supabase/supabase-js';
import { createClient } from './server';
import { redirect } from 'next/navigation';

// Provider => github | google | apple | kakao ...
const signInWith = (provider: Provider) => async () => {
	const supabase = await createClient();

	// 위 경로를 직접 구현해야함. 위치에 page.tsx가 아닌 routes.ts를 생성해야함.
	// 로그인 결과를 /auth/callback으로 전달한다.
	const auth_callback_url = `${process.env.SITE_URL}/auth/callback`; // /auth/callback/route.ts에서 request 핸들링

	const { data, error } = await supabase.auth.signInWithOAuth({
		provider,
		options: {
			redirectTo: auth_callback_url
		}
	});

	if (error) {
		redirect('/error');
	}

	redirect(data.url);
};

export const signInWithGoogle = signInWith('google');
export const signInWithGithub = signInWith('github');
