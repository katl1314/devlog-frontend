import { NextRequest, NextResponse } from 'next/server';

// middleware는 src 폴더 아래에 위치한다.
export async function middleware(req: NextRequest) {
	const url = req.nextUrl.clone();
	const pathname = url.pathname;

	// layout.ts에서 header.get를 통해서 pathname을 가져온다.
	const headers = new Headers();
	headers.set('x-pathname', url.pathname);

	// Cookie를 직접 Headers에 추가
	const cookies = req.cookies
		.getAll()
		.map(c => `${c.name}=${c.value}`)
		.join('; ');
	if (cookies) {
		headers.set('cookie', cookies);
	}

	// @로 시작하는 URL이면 사용자 페이지로 rewrite
	if (pathname.startsWith('/@')) {
		const param = pathname.slice(2);
		url.pathname =
			pathname.lastIndexOf('/') < 1 ? `/user/${param}` : `/post/${param}`;
		if (req.method === 'GET') {
			return NextResponse.rewrite(url, {
				request: {
					headers
				}
			});
		}

		return NextResponse.redirect(url);
	} else if (pathname === '/') {
		url.pathname = `${pathname}new`;
		return NextResponse.rewrite(url);
	} else if (pathname === '/write') {
		return NextResponse.next();
	} else {
	}

	return NextResponse.next(); // 다른 경로는 그대로
}

export const config = {
	matcher: ['/', '/@:userId', '/new', '/write', '/@:userId/:slug'] // 루트 포함
};
