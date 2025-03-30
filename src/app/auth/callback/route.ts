import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';

// Next.js route.ts를 사용하면 request, response api사용하여 특정 라우트에 대한 사용자 정의 요청 핸들러 개발 가능.

export async function GET(request: NextRequest) {
	const { searchParams, origin } = new URL(request.url);
	const code = searchParams.get('code');
	const next = searchParams.get('next') ?? '/';

	// supabase 인증 성공 시 querystring으로 code가 전달받는다.
	if (code) {
		const supabase = await createClient();
		// code를 통해서 세션으로 변경한다.
		const { error } = await supabase.auth.exchangeCodeForSession(code);
		if (!error) {
			const forwardedHost = request.headers.get('x-forwarded-host');
			const isLocalEnv = process.env.NODE_ENV === 'development';
			if (isLocalEnv) {
				return NextResponse.redirect(`${origin}${next}`);
			} else if (forwardedHost) {
				return NextResponse.redirect(`https://${forwardedHost}${next}`);
			} else {
				return NextResponse.redirect(`${origin}${next}`);
			}
		}
	}

	return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
