'use server';

import { createClientByServer } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

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
	const auth = await supabase.auth.getUser();

	if (auth.error) {
		throw new Error('로그인정보가 없습니다.');
	}
	const title = formData.get('title')?.toString();
	const content = formData.get('content')?.toString();
	const authCd = formData.get('visibility')?.toString();
	const thumbnail = formData.get('thumbnail')?.toString();
	const path = formData.get('path')?.toString();
	const summary = formData.get('summary')?.toString();
	const tags = JSON.parse(formData.get('tags')?.toString() ?? '[]') as Array<string>;

	const { data } = await supabase.from('profiles').select('userId').eq('id', auth.data.user?.id).single();

	if (!data) return { message: '사용자 정보가 없습니다.' };

	const { error } = await supabase
		.from('posts')
		.insert({ title, content, thumbnail, path, summary, auth_cd: authCd, userId: data.userId });

	if (error) {
		return { message: '이미 존재하는 URL입니다.' };
	}

	// 태그 리스트를 테이블에 저장한다. 중복되면 안됨.
	await supabase.from('tag').insert(
		tags.map(name => ({
			name
		}))
	); // bluk로 추가한다.

	const { data: tagIds } = await supabase.from('tag').select('tag_id').in('name', tags);

	await supabase.from('posts_tag').insert(tagIds?.map(d => ({ ...d, path, userId: data.userId })));

	redirect('/');
};
