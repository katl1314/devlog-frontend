import { createClientByServer } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const userId = searchParams.get('userId');
	const postId = searchParams.get('postId');
	const pageParam = Number(searchParams.get('pageParam'));
	const supabase = await createClientByServer();

	let posts;
	const comments = await supabase.from('comments').select();

	if (searchParams.size < 1) {
		// 모든 포스트 조회
		posts = await supabase.from('posts').select('userId, path');
	} else if (postId) {
		posts = await supabase.from('posts').select().eq('path', postId);
	} else if (userId) {
		posts = await supabase
			.from('posts')
			.select()
			.eq('userId', userId)
			.range(pageParam, pageParam + 9)
			.order('created_at', { ascending: false });
	} else {
		posts = await supabase
			.from('posts')
			.select()
			.range(pageParam, pageParam + 9)
			.order('created_at', { ascending: false });
	}

	const { error, data } = posts;

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	if (comments.error) {
		return NextResponse.json({ error: comments.error.message }, { status: 500 });
	}

	// 썸네일
	let resData = data.map(post => {
		if (post.thumbnail) {
			const { data } = supabase.storage.from('thumbnail').getPublicUrl(post.thumbnail);
			return { ...post, thumbnail: data.publicUrl };
		}
		return post;
	});

	// 댓글 카운트
	resData = resData.map(post => {
		const path = post.path;
		const commentCnt = comments.data.filter(d => d.path === path).length;
		return { ...post, comments: commentCnt };
	});

	return NextResponse.json({ data: resData });
}
