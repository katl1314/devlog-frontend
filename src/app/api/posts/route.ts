import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const postId = searchParams.get('postId');
	const authId = searchParams.get('authId');
	const pageParam = Number(searchParams.get('pageParam'));
	return NextResponse.json({ data: [] });
}
