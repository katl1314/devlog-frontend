import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';

// Next.js route.ts를 사용하면 request, response api사용하여 특정 라우트에 대한 사용자 정의 요청 핸들러 개발 가능.

export async function GET(request: NextRequest) {
	const { searchParams, origin } = new URL(request.url);
	console.log(request.url);
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

			if (await authUser(supabase)) {
				if (isLocalEnv) {
					return NextResponse.redirect(`${origin}${next}`);
				} else if (forwardedHost) {
					return NextResponse.redirect(`https://${forwardedHost}${next}`);
				} else {
					return NextResponse.redirect(`${origin}${next}`);
				}
			}
		}
	}

	return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}

async function authUser(supabase: SupabaseClient) {
	try {
		const {
			data: { user }
		} = await supabase.auth.getUser();

		if (!user) throw new Error();

		const { error, data } = await supabase.from('profiles').select().eq('id', user.id);

		if (error) throw new Error();

		if (data.length < 1) {
			const {
				id,
				updated_at,
				user_metadata: { avatar_url, full_name, user_name }
			} = user;
			// 만약 profiles 스키마에 id에 해당하는 데이터가 없는 경우 추가한다.
			const { error } = await supabase
				.from('profiles')
				.insert([{ id, updated_at, avatar_url, full_name, username: user_name }]);

			if (error) throw new Error();
		}
		return true;
	} catch {
		return false;
	}
}
