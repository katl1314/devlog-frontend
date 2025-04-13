import { NextRequest, NextResponse } from 'next/server';

// middleware는 src 폴더 아래에 위치한다.
export function middleware(req: NextRequest) {
	const url = req.nextUrl.clone();
	const pathname = url.pathname;

	// @로 시작하는 URL이면 사용자 페이지로 rewrite
	if (pathname.startsWith('/@')) {
		const username = pathname.slice(2); // remove leading "@"
		url.pathname = `/user/${username}`;
		console.log(url.pathname);
		return NextResponse.rewrite(url);
	} else if (pathname === '/') {
		// 루트는 /trends로 rewrite
		url.pathname = `${pathname}trends`;
		return NextResponse.rewrite(url);
	}

	return NextResponse.next(); // 다른 경로는 그대로
}

export const config = {
	matcher: ['/', '/@:username*', '/feed', '/trends', '/new'] // 루트 포함
};
