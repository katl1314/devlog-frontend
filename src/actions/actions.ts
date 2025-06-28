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
		let user;
		// 포스트 등록에 유효한 사용자인지 확인한다.
		if ((user = await validateByUser(auth.data.user?.id))) {
			const { title, content, visibility, file, path, summary, tags } = parseFormData(formData, { tags: 'object' });

			// 만약 중복된 path가 있으면 에러를 반환해야한다.
			const { data } = await supabase.from('posts').select().eq('path', path);

			if (data?.length ?? 0 > 0) {
				return { status: 'ERROR', message: '이미 존재하는 URL입니다.' };
			}

			// 만약 포스트에 썸네일 이미지가 있는경우 storage에 등록한다.
			const uploadImage = await saveStorageImage(file as File);
			const post = {
				title,
				content,
				path,
				summary,
				auth_cd: visibility,
				thumbnail: uploadImage?.path,
				userId: user.userId
			};

			await supabase.from('posts').insert(post);

			if (!tags) return { status: 'OK' };

			if (!(await saveHashTags(tags as string[], path as string))) {
				throw new Error('태그 등록 중 에러가 발생하였습니다.');
			}
		}

		return { status: 'OK' };
	} catch (err: unknown) {
		return { message: (err as Error).message, status: 'ERROR' };
	}
};

const validateByUser = async (id?: string) => {
	const supabase = await createClientByServer();
	const { data } = await supabase.from('profiles').select('userId').eq('id', id).single();

	if (!data) {
		return;
	}

	return data;
};

const saveStorageImage = async (file: File | undefined | null) => {
	const supabase = await createClientByServer();

	const bucket = process.env.NEXT_PUBLIC_STORAGE_BUCKET as string;

	if (!file) return null; // 파일이 없어도 무조건 true한다.

	const { data, error } = await supabase.storage.from(bucket).upload(file?.name, file, { upsert: true });

	if (error) throw new Error(error.message);

	return data;
};

const saveHashTags = async (tags: string[], path: string) => {
	const supabase = await createClientByServer();

	const hashTags = (tags as string[]).map(name => ({
		name
	}));

	const tagResult = await supabase.from('tag').upsert(hashTags, {
		onConflict: 'name',
		ignoreDuplicates: true
	});

	if (tagResult.error) return false;

	const { data: tagIds } = await supabase.from('tag').select('tag_id').in('name', tags);

	const rows = tagIds?.map(tag => ({ ...tag, path }));

	const postTagResult = await supabase.from('posts_tag').upsert(rows, {
		onConflict: 'path, tag_id'
	});

	if (postTagResult.error) return false;

	return true;
};

// 댓글 추가
export const saveComments = async (_: unknown, formData: FormData) => {
	try {
		const supabase = await createClientByServer();

		const auth = await supabase.auth.getUser();
		if (auth.error) throw new Error(auth.error.message);

		const user = await supabase.from('profiles').select('userId').eq('id', auth.data.user.id).single();

		if (user.error) throw new Error(user.error.message);

		const pid = formData.get('pid')?.toString() || null; // null이면 루트로 간주합니다.
		const path = formData.get('path')?.toString();
		const userId = user.data?.userId;
		const comments = formData.get('comments')?.toString();
		const level = formData.get('level')?.toString();

		if (comments === '') throw new Error('댓글을 입력하세요.');

		const { error } = await supabase.from('comments').insert({ pid, path, userId, comments, level });

		if (error) throw new Error(error.message);

		return { status: 'OK' };
	} catch (err: unknown) {
		return { status: 'ERROR', message: (err as Error).message };
	}
};

// 댓글 삭제
// pid를 id의 FK로 설정한다. CASCADE를 사용하여 연쇄적으로 삭제한다.
export const deleteComments = async (id: number) => {
	try {
		const supabase = await createClientByServer();
		const auth = await supabase.auth.getUser();
		// Soft Delete 고민
		const comments = await supabase.from('comments').delete().eq('id', id);

		if (auth.error) throw new Error(auth.error.message);
		if (comments.error) throw new Error(comments.error.message);

		return { status: 'OK' };
	} catch (err: unknown) {
		return { status: 'ERROR', message: (err as Error).message };
	}
};

// 댓글 수정
export const updateComments = async (_: unknown, formData: FormData) => {};

// 좋아요
export const toggleLike = async (path: string) => {
	try {
		// 로그인 여부
		const supabase = await createClientByServer();
		const auth = await supabase.auth.getUser();

		if (auth.error) throw new Error('로그인 정보가 없습니다.');

		const profile = await supabase.from('profiles').select('userId').eq('id', auth.data.user.id).single();
		const userId = profile.data?.userId;

		// 만약 테이블에 값이 있으면 삭제, 없으면 추가
		const { error, data } = await supabase.from('like').select().eq('path', path).eq('userId', userId);

		if (error) throw new Error(error.message);

		if (data.length > 0) {
			// 삭제
			await supabase.from('like').delete().eq('path', path).eq('userId', userId);
		} else {
			// 추가
			const test = await supabase.from('like').insert({ path, userId });
		}

		return { status: 'OK' };
	} catch (err) {
		return { status: 'ERROR', message: (err as Error).message };
	}
};
