import { NextRequest, NextResponse } from 'next/server';
import { postService } from './services/post.service';
import { match } from 'path-to-regexp';
import { isEmpty } from './utils';
import { auth } from './auth';

const matchersForAuth = ['/write', '/notifications', '/following', '/settings']; // 비로그인 시 접근하면 로그인 화면으로 이동한다.
const matchersForSignIn = ['/signup', '/auth']; // 로그인 관련 화면

export async function middleware(req: NextRequest) {
	const url = req.nextUrl.clone();
	const { pathname, searchParams } = url;
	const session = await auth();
	// 권한 관련 먼저 체크할 것.
	if (isMatch(pathname, matchersForAuth)) {
		if (isEmpty(session)) {
			return NextResponse.redirect(new URL(`/auth?callbackUrl=${pathname}`, req.url));
		}
		// 탈퇴 유예 계정은 복구 페이지로 리다이렉트 (복구 페이지 자체는 제외)
		if (pathname !== '/auth/restore' && (session.user as any)?.deletedAt) {
			return NextResponse.redirect(new URL('/auth/restore', req.url));
		}

		// /write?id=... 인 경우 포스트 존재 + 소유자 검증 (백엔드 AccessTokenGuard + user_id 검증)
		const id = searchParams.get('id') || '';
		if (pathname === '/write' && !isEmpty(id)) {
			const accessToken = (session as any).accessToken as string;
			const post = await postService.findPostById(id, accessToken).catch(() => null);
			if (!post) {
				return NextResponse.rewrite(new URL('/not-found', req.url));
			}
		}
	}
	// 인증 후 회원가입 및 로그인 접근 제어!
	if (isMatch(pathname, matchersForSignIn)) {
		return session ? NextResponse.redirect(new URL('/', req.url)) : NextResponse.next();
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
	matcher: [
		'/',
		'/@:userId',
		'/new',
		'/write',
		'/auth',
		'/auth/restore',
		'/@:userId/:slug',
		'/notifications',
		'/following',
		'/settings'
	]
};
