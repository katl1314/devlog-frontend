import { NextRequest, NextResponse } from 'next/server';
import { match } from 'path-to-regexp';
import { auth } from './auth';
import { isEmpty } from './utils';

const matchersForAuth = ['/write', '/notifications', '/following', '/settings']; // 비로그인 시 접근하면 로그인 화면으로 이동한다.
const matchersForSignIn = ['/signup', '/auth']; // 로그인 관련 화면

export async function middleware(req: NextRequest) {
	const url = req.nextUrl.clone();
	const pathname = url.pathname;

	// 권한 관련 먼저 체크할 것.
	if (isMatch(pathname, matchersForAuth)) {
		const session = await auth();
		if (isEmpty(session)) {
			// 반드시 절대좌표이어야 한다.
			return NextResponse.redirect(new URL(`/auth?callbackUrl=${pathname}`, req.url));
		}
	}
	// 인증 후 회원가입 및 로그인 접근 제어!
	if (isMatch(pathname, matchersForSignIn)) {
		return (await auth()) ? NextResponse.redirect(new URL('/', req.url)) : NextResponse.next();
	}

	if (pathname.startsWith('/@')) {
		const param = pathname.slice(2);
		url.pathname = `/user/${param}`;
		if (req.method === 'GET') {
			return NextResponse.rewrite(url);
		}
		return NextResponse.redirect(url);
	} else if (pathname === '/') {
		url.pathname = `${pathname}new`;
		return NextResponse.rewrite(url);
	}

	return NextResponse.next(); // 다른 경로는 그대로
}

// 경로 일치 확인!
function isMatch(pathname: string, urls: string[]) {
	return urls.some(url => !!match(url)(pathname));
}

// 미들웨어 적용 대상 경로
export const config = {
	matcher: ['/', '/@:userId', '/new', '/write', '/auth', '/@:userId/:slug', '/notifications', '/following', '/settings']
};
