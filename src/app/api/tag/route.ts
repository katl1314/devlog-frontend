import { createClientByServer } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const supabase = await createClientByServer();
	const { searchParams } = new URL(req.url);
	const path = searchParams.get('path');

	const { error, data } = await supabase.from('posts_tag').select('tag_id').eq('path', path);

	if (error) throw new Error('태그가져오는 도중 에러가 발생하였습니다');

	const tagIds = data.map(({ tag_id }) => tag_id);

	const { data: tags } = await supabase.from('tag').select('name').in('tag_id', tagIds);

	return NextResponse.json({ data: tags });
}
