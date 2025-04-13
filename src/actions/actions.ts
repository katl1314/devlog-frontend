'use server';

import { createClientByServer } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export const registUser = async (_: unknown, formData: FormData) => {
	const supabase = await createClientByServer();
	const { data, error: authError } = await supabase.auth.getUser();

	if (authError) throw new Error(authError.message);

	const {
		id,
		user_metadata: { avatar_url }
	} = data.user;
	const userId = formData.get('userId')?.toString();
	const username = formData.get('username')?.toString();
	const description = formData.get('content')?.toString();

	const { error } = await supabase.from('profiles').insert([{ id, userId, avatar_url, username, description }]);

	if (error) throw new Error(error.message);

	redirect('/');
};
