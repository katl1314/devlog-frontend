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

	const profiles = await supabase.from('profiles').insert([{ id, userId, avatar_url, username, description }]);

	if (profiles.error) throw new Error(profiles.error.message);

	// 블로그 생성
	const blog = await supabase.from('blog').insert({ userId, title: `${userId}.log` });
	if (blog.error) throw new Error(blog.error.message);
	redirect('/');
};

export const savePost = async (_: unknown, formData: FormData) => {
	const supabase = await createClientByServer();
	const { data: user } = await supabase.auth.getUser();

	if (user) {
		const title = formData.get('title')?.toString();
		const content = formData.get('content')?.toString();
		const visibility = formData.get('visibility')?.toString();
		const thumbnail = formData.get('thumbnail')?.toString();
		const path = formData.get('path')?.toString();
		const tags = formData.get('tags')?.toString();

		console.log(title, content, visibility, thumbnail, path, tags);

		redirect('/');
	}
};
