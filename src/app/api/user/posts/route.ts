import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const userId = searchParams.get('userId');
	const pageParam = Number(searchParams.get('pageParam'));
	console.log(userId, pageParam);
}

/*
import { createClientByServer } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const userId = searchParams.get('userId');
	const pageParam = Number(searchParams.get('pageParam'));
	const supabase = await createClientByServer();

	const comments = await supabase.from('comments').select();
	const likes = await supabase.from('like').select();

	const posts = await supabase
		.from('posts_with_userinfo')
		.select()
		.eq('userid', userId)
		.range(pageParam, pageParam + 9)
		.order('created_at', { ascending: false });
	console.log(posts);

	const { error, data } = posts;

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
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
	let resData = data.map(post => {
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
		const likeCnt = likes.data.filter(d => d.path === path).length;
		return { ...post, like: likeCnt };
	});

	return NextResponse.json({ data: resData });
}

*/
