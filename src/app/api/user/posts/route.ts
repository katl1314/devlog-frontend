import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const userId = searchParams.get('userId');
	const pageParam = Number(searchParams.get('pageParam'));
}
