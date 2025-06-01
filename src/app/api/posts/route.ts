import { createClientByServer } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const pageParam = Number(searchParams.get('pageParam'));
	const userId = searchParams.get('userId');
	//const tab = searchParams.get('tab');
	const supabase = await createClientByServer();

	let posts;

	if (userId) {
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

	// 썸네일
	const resData = data.map(post => {
		if (post.thumbnail) {
			const { data } = supabase.storage.from('thumbnail').getPublicUrl(post.thumbnail);
			return { ...post, thumbnail: data.publicUrl };
		}
		return post;
	});

	return NextResponse.json({ data: resData });
}
