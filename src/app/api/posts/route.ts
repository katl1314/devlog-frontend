import { createClientByServer } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const supabase = await createClientByServer();
	const { searchParams } = new URL(request.url);
	const postId = searchParams.get('postId');
	const authId = searchParams.get('authId');
	const pageParam = Number(searchParams.get('pageParam'));
	const comments = await supabase.from('comments').select();
	const likes = await supabase.from('like').select();
	const { data } = await supabase
		.from('profiles')
		.select('userId')
		.eq('id', authId)
		.single();

	let posts;
	if (searchParams.size < 1) {
		// 모든 포스트 조회
		posts = await supabase.from('posts').select('userId, path');
	} else if (postId) {
		posts = await supabase.from('posts').select().eq('path', postId);
	} else {
		posts = await supabase
			.from('posts')
			.select()
			.range(pageParam, pageParam + 9)
			.order('created_at', { ascending: false });
	}

	if (posts.error) {
		return NextResponse.json({ error: posts.error.message }, { status: 500 });
	}

	if (comments.error) {
		return NextResponse.json(
			{ error: comments.error.message },
			{ status: 500 }
		);
	}

	if (likes.error) {
		return NextResponse.json({ error: likes.error.message }, { status: 500 });
	}

	// 썸네일
	let resData = posts.data.map(post => {
		if (post.thumbnail) {
			const { data } = supabase.storage
				.from('thumbnail')
				.getPublicUrl(post.thumbnail);
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

	// 좋아요 개수
	resData = resData.map(post => {
		const path = post.path;
		const like = likes.data.filter(d => d.path === path).length;
		const isLike =
			likes.data.filter(d => d.path === path && d.userId === data?.userId)
				.length > 0;
		return { ...post, like, isLike };
	});

	return NextResponse.json({ data: resData });
}
