import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

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
		signIn: '/signin' // /auth/signin
	},
	callbacks: {
		async signIn() {
			console.log(1111);
			return true;
		},
		async jwt({ token, user }) {
			// 로그인 시 user 정보를 JWT에 싣기
			console.log(2222);
			if (user) {
				token.id = user.id;
				token.role = (user as any).role;
			}
			return token;
		},
		async session({ session, token }) {
			// 클라이언트에서 사용할 세션 필드 구성
			console.log(3333);
			if (token) {
				(session as any).user.id = token.id;
				(session as any).user.role = token.role;
			}
			return session;
		}
	}
});
