import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
	const url = req.nextUrl.clone();

	const pathname = url.pathname;

	if (pathname.startsWith('/@')) {
		const param = pathname.slice(2);
		url.pathname = `/user/${param}`;
		console.log(url.pathname)
		if (req.method === 'GET') {
			return NextResponse.rewrite(url)
		}
		return NextResponse.redirect(url);
	}
	else if (pathname === '/') {
		url.pathname = `${pathname}new`;
		return NextResponse.rewrite(url);
	}

	return NextResponse.next(); // 다른 경로는 그대로
}

export const config = {
	matcher: ['/', '/@:userId', '/new', '/write', '/@:userId/:slug'] // 루트 포함
};
