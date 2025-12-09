import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { hasUser, searchUser } from './lib/db';
import { cookies } from 'next/headers';
import { stringToBase64 } from './lib/utils';

export const { handlers, auth, signIn, signOut } = NextAuth({
	session: {
		strategy: 'jwt',
		maxAge: 60 * 60 * 24 // 세션 만료 시간
	},
	providers: [
		Credentials({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' }
			},
			async authorize(credentials) {
				// 실제 DB 또는 인증 로직이 없을 경우 테스트용으로 고정 유저 반환
				if (
					credentials?.email === 'test@example.com' &&
					credentials.password === 'test'
				) {
					return {
						id: '1',
						name: 'Test User',
						email: 'test@example.com',
						role: 'user' // 필요한 추가 필드도 넣을 수 있음
					};
				}
				// 그 외의 경우 인증 실패 처리
				return null;
			}
		}),
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!
		})
	],
	pages: {
		signIn: '/auth'
	},
	events: {
		async signOut(message) {
			console.log('signOut event ----', message);
		}
	},
	callbacks: {
		async signIn({ user, account }) {
			try {
				console.log('signIn -------');
				const verifyUser = await hasUser(user.email!);
				if (!verifyUser) {
					const signInfo = JSON.stringify({
						user,
						accountId: account?.providerAccountId,
						provider: account?.provider
					});
					const token = stringToBase64(signInfo);
					// 회원가입을 위한 정보를 쿠키에 저장한다.
					(await cookies()).set('signup_token', token, {
						httpOnly: true,
						maxAge: 15 * 60, // 15분
						path: '/'
					});
					return '/auth/signup';
				}
				return true;
			} catch (err: unknown) {
				console.log('failed -----', (err as Error).message);
				return false;
			}
		},

		async jwt({ token, user, account }) {
			// 로그인 시 user 정보를 JWT에 싣기
			console.log('jwt ------------');
			if (user) {
				token.id = user.id;
				token.role = (user as any).role;
				token.provider = account?.provider;
				token.accountId = account?.providerAccountId;
				token.email = user.email;
			}
			return token;
		},
		async session({ session, token }) {
			// 클라이언트에서 사용할 세션 필드 구성
			if (token) {
				(session as any).user.id = token.id;
				(session as any).user.role = token.role;
			}
			return session;
		}
	}
});
