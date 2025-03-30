'use server';

import { Provider } from '@supabase/supabase-js';
import { createClient } from './server';
import { redirect } from 'next/navigation';

// Provider => github | google | apple | kakao ...
const signInWith = (provider: Provider) => async () => {
	const supabase = await createClient();

	const auth_callback_url = `${process.env.SITE_URL}/auth/callback`;

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
