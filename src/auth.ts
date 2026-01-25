import Credentials from 'next-auth/providers/credentials';
import { userService } from '@/services/user.service';
import { authService } from '@/services/auth.service';
import NextAuth, { Account, User } from 'next-auth';
import Google from 'next-auth/providers/google';
import { stringToBase64 } from './utils';
import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';


const SESSION_MAX_AGE = 60 * 60 * 24; // 세션 만료 시간

const signUp = async (user: User, account: Account | null | undefined) => {
	const cookieStore = await cookies();
	const signInfo = JSON.stringify({
		user,
		provider: account?.provider
	});
	const token = stringToBase64(signInfo);
	cookieStore.set('signup-token', token, {
		httpOnly: true,
		maxAge: 15 * 60, // 15분
		path: '/'
	});
	return '/auth/signup'
}

export const { handlers, auth } = NextAuth({
	session: {
		strategy: 'jwt',
		maxAge: SESSION_MAX_AGE,
	},
	providers: [
		Credentials({
			id: 'signup-complete',
			name: 'signup-complete',
			credentials: {
				email: { label: 'Email', type: 'email' },
				signupToken: { label: 'Token', type: 'text' } // 단순 비번 대신 토큰 사용 권장
			},
			async authorize({ email }) {
				if (!email) return null;

				const dbUser = await userService.findUserByEmail(email as string);  // lib/db에 추가
				if (dbUser) {
					return {
						id: dbUser.user_id,      // DB PK
						email: dbUser.email,
						name: dbUser.user_name,
						image: dbUser.avatar_url,
						role: 'user'
					};
				}
				return null;
			}
		}),
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			allowDangerousEmailAccountLinking: false, // 동일 이메일로 가입하면 에러를 발생한다.
		})
	],
	pages: {
		signIn: '/auth',
		error: '/error' // 에러 발생시 페이지
	},
	events: {
		async signIn() {
			const cookieStore = await cookies();
			cookieStore.delete('signup-token');
		}
	},
	callbacks: {
		async signIn({ user, account }) {
			try {
				const validUser = await userService.has(user.email!);
				if (!validUser) {
					return await signUp(user, account);
				}
				return true;
			} catch {
				return false;
			}
		},
		async jwt({ token, user }) {
			if (user) {
				const { accessToken, refreshToken, userId } = await authService.signIn(user);
				token.email = user.email!;
				token.userId = userId;
				token.role = (user as any).role;
				token.image = user.image!;
				token.accessToken = accessToken;
				token.refreshToken = refreshToken;
			}

			const decoded = jwtDecode(token.accessToken);
			if (decoded.exp && decoded.exp < Date.now() / 1000) {
				const { accessToken } = await authService.rotateToken(token.refreshToken);
				token.accessToken = accessToken;
			}
		
		return token;
		},
		async session({ session, token }) {
			// 클라이언트에서 사용할 세션 필드 구성
			if (token && session.user) {
				(session.user as any).id = token.userId;
				(session.user as any).role = token.role;
				(session.user as any).image = token.image;
				(session as any).accessToken = token.accessToken;
				(session as any).refreshToken = token.refreshToken;
			}
			return session;
		}
	}
});
