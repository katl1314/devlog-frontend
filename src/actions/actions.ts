'use server';

import { parseFormData } from '@/lib/utils';
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
	try {
		// TODO 트랜잭션 처리 추가필요
		const supabase = await createClientByServer();
		const auth = await supabase.auth.getUser();

		const { title, content, visibility, thumbnail, path, summary, tags } = parseFormData(formData, { tags: 'object' });

		const { data } = await supabase.from('profiles').select('userId').eq('id', auth.data.user?.id).single();

		if (!data) throw new Error('사용자 정보가 없습니다.');

		const post = { title, content, thumbnail, path, summary, auth_cd: visibility, userId: data.userId };
		await supabase.from('posts').insert(post);

		if (!tags) return { status: 'OK' };

		const insertTags = (tags as []).map(name => ({
			name
		}));

		await supabase.from('tag').upsert(insertTags, {
			onConflict: 'name',
			ignoreDuplicates: true
		});

		const { data: tagIds } = await supabase
			.from('tag')
			.select('tag_id')
			.in('name', tags as []);

		const rows = tagIds?.map(tag => ({ ...tag, path }));
		console.log(rows);

		await supabase.from('posts_tag').upsert(rows, {
			onConflict: 'path, tag_id'
		});

		return { status: 'OK' };
	} catch (err: unknown) {
		return { message: (err as Error).message, status: 'ERROR' };
	}
};
