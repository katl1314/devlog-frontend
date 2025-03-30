'use server';

import { Provider } from '@supabase/supabase-js';
import { createClient } from './server';
import { redirect } from 'next/navigation';

const signInWith = (provider: Provider) => async () => {
	const supabase = await createClient();

	const auth_callback_url = `${process.env.SITE_URL}/auth/callback`;

	const { data, error } = await supabase.auth.signInWithOAuth({
		provider,
		options: {
			redirectTo: auth_callback_url
		}
	});

	console.log(data);

	if (error) {
		console.log(error);
	}

	redirect(data.url as string);
};

const signInWithGoogle = signInWith('google');

export { signInWithGoogle };
