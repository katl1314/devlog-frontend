import { createClientByServer } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const supabase = await createClientByServer();
	const { searchParams } = new URL(req.url);
	const path = searchParams.get('path');

	// view를 생성하여 쿼리 하나로 처리하도록 구성
	/**
	 *  CREATE VIEW posts_tags_view AS
	 *	SELECT pt.*, t.name
	 *	FROM posts_tag pt
	 *	JOIN tag t ON pt.tag_id = t.tag_id;
	 */
	const { data, error } = await supabase
		.from('posts_tags_view')
		.select('tag_id, name')
		.eq('path', path);

	if (error) throw new Error('태그가져오는 도중 에러가 발생하였습니다');

	const tags = data.map(d => d.name);

	return NextResponse.json({ data: tags });
}
