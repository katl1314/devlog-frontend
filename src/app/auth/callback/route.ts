import { NextRequest, NextResponse } from 'next/server';

import { createClientByServer } from '@/utils/supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';

// Next.js route.ts를 사용하면 request, response api사용하여 특정 라우트에 대한 사용자 정의 요청 핸들러 개발 가능.
// http://localhost:3000/**/*
export async function GET(request: NextRequest) {
	try {
		const forwardedHost = request.headers.get('x-forwarded-host');
		const { searchParams } = new URL(request.url);

		const code = searchParams.get('code');
		const next = searchParams.get('next') ?? '/';
		const origin = process.env.NEXT_PUBLIC_SITE_URL;

		// supabase 인증 성공 시 querystring으로 code가 전달받는다.
		if (code) {
			const supabase = await createClientByServer();
			// code를 통해서 세션으로 변경한다.
			const { error } = await supabase.auth.exchangeCodeForSession(code);
			if (!error) {
				if (await authUser(supabase)) {
					if (forwardedHost) {
						return NextResponse.redirect(`https://${forwardedHost}${next}`);
					}
					return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}${next}`);
				} else {
					if (forwardedHost) {
						return NextResponse.redirect(`https://${forwardedHost}/register?code=${code}`);
					}
					return NextResponse.redirect(`${origin}/register?code=${code}`);
				}
			}
		} else {
			throw new Error();
		}
	} catch {
		return NextResponse.redirect(`${origin}/auth/auth-code-error`);
	}
}

async function authUser(supabase: SupabaseClient) {
	const {
		data: { user }
	} = await supabase.auth.getUser();

	if (!user) throw new Error();
	const { error, data } = await supabase.from('profiles').select().eq('id', user.id);

	if (error) throw new Error();

	if (data.length < 1) {
		return false;
	}
	return true;
}
