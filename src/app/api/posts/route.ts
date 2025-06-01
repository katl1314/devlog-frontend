import { createClientByServer } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const pageParam = Number(searchParams.get('pageParam'));
	const tab = searchParams.get('tab');
	const supabase = await createClientByServer();

	const { error, data } = await supabase
		.from('posts')
		.select()
		.range(pageParam, pageParam + 9)
		.order('created_at', { ascending: false });

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
