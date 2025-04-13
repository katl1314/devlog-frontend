import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
	let supabaseResponse = NextResponse.next({
		request
	});

	// 서버 사이드 클라이언트 생성 => 함수는 매우 가벼워서 매번 요청해도 문제가 없다. (걱정 X)
	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
					supabaseResponse = NextResponse.next({
						request
					});
					cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
				}
			}
		}
	);

	const {
		data: { user }
	} = await supabase.auth.getUser(); // supabase 서버에서 fetch하므로 보안상 권장함. => getSession은 해커에 의해 잘못된 세션을 가져올 수 있음.

	if (!user && !request.nextUrl.pathname.startsWith('/login') && !request.nextUrl.pathname.startsWith('/auth')) {
		// no user, potentially respond by redirecting the user to the login page
		const url = request.nextUrl.clone();
		url.pathname = '/login'; // 만약 요청 경로가 user가 없으면서 /login, /auth으로 시작하지 않으면 무조건 /login으로 리다이렉트
		return NextResponse.redirect(url);
	}

	return supabaseResponse;
}
