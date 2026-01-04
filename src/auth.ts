import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { hasUser, searchUserByEmail } from './lib/db';
import { stringToBase64 } from './lib/utils';
import { cookies } from 'next/headers';

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
			async authorize({ email, password }) {
				// 실제 DB 또는 인증 로직이 없을 경우 테스트용으로 고정 유저 반환
				if (email === 'test@example.com' && password === 'test') {
					return {
						id: '1',
						name: 'Test User',
						email: 'test@example.com',
						role: 'user'
					};
				}

				// OAuth 로그인 이후 처리
				if (password === 'signup-complete') {
					const dbUser = await searchUserByEmail(email as string);  // lib/db에 추가
					console.log('signup-complete >>>', dbUser);
					if (dbUser) {
						return {
							id: dbUser.user_id,      // DB PK
							email: dbUser.email,
							name: dbUser.user_name,
							image: dbUser.avatar_url,
							role: 'user'
						};
					}
				}
				return null;
			}
		}),
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!
		})
	],
	pages: {
		signIn: '/auth',
		error: '/error' // 에러 발생시 페이지
	},
	events: {
		async signOut() {}
	},
	callbacks: {
		async signIn({ user, account }) {
			try {
				const verifyUser = await hasUser(user.email!);
				if (!verifyUser) {
					const signInfo = JSON.stringify({
						user,
						provider: account?.provider
					});
					const token = stringToBase64(signInfo);
					const cookieStore = await cookies();
					cookieStore.set('signup_token', token, {
						httpOnly: true,
						maxAge: 15 * 60, // 15분
						path: '/'
					});
					return '/auth/signup'
				}
				return true;
			} catch (err) {
				return false;
			}
		},

		async jwt({ token, user }) {
			if (user) {
				token.email = user.email;
				token.userId = user.id;
				token.role = (user as any).role;
				token.image = user?.image;
			}
			return token;
		},
		async session({ session, token }) {
			// 클라이언트에서 사용할 세션 필드 구성
			if (token) {
				(session as any).user.id = session.userId;
				(session as any).user.role = token.role;
				(session as any).user.image = token.image;
			}
			return session;
		}
	}
});
