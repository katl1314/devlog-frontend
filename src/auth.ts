import Credentials from 'next-auth/providers/credentials';
import { userService } from '@/services/user.service';
import { authService } from '@/services/auth.service';
import NextAuth, { Account, User } from 'next-auth';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
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
	return '/auth/signup';
};

export const { handlers, auth } = NextAuth({
	session: {
		strategy: 'jwt',
		maxAge: SESSION_MAX_AGE
	},
	providers: [
		Credentials({
			id: 'signup-complete',
			name: 'signup-complete',
			credentials: {
				email: { label: 'Email', type: 'email' },
				signupToken: { label: 'Token', type: 'text' }
			},
			async authorize({ email }) {
				if (!email) return null;

				const dbUser = await userService.findUserByEmail(email as string);
				if (dbUser) {
					return {
						id: dbUser.user_id,
						email: dbUser.email,
						name: dbUser.user_name,
						image: dbUser.avatar_url,
						role: 'user'
					};
				}
				return null;
			}
		}),
		Credentials({
			id: 'credentials',
			name: 'credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' }
			},
			async authorize({ email, password }) {
				if (!email || !password) return null;
				try {
					const { userId, email: userEmail, user_name, avatar_url } =
						await authService.signInWithCredentials(
							email as string,
							password as string
						);
					return {
						id: userId,
						email: userEmail,
						name: user_name,
						image: avatar_url,
						role: 'user'
					};
				} catch {
					return null;
				}
			}
		}),
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			allowDangerousEmailAccountLinking: false // 동일 이메일로 가입하면 에러를 발생한다.
		}),
		GitHub({
			clientId: process.env.GITHUB_CLIENT_ID!,
			clientSecret: process.env.GITHUB_CLIENT_SECRET!,
			allowDangerousEmailAccountLinking: false
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
			// signup-complete: 회원가입 완료 직후, 별도 검증 불필요
			if (account?.provider === 'signup-complete') {
				return true;
			}
			try {
				let dbUser;
				try {
					dbUser = await userService.findUserByEmail(user.email!);
				} catch {
					// credentials: authorize()에서 이미 검증된 계정 → 404는 예외 상황
					if (account?.provider === 'credentials') return false;
					// OAuth: 신규 유저 → 회원가입 플로우
					return await signUp(user, account);
				}

				// 탈퇴 유예 계정 처리 (모든 provider 공통)
				if ((dbUser as any).deleted_at) {
					const elapsed = Date.now() - new Date((dbUser as any).deleted_at).getTime();
					if (elapsed > 7 * 24 * 60 * 60 * 1000) {
						return false; // 7일 경과: 로그인 거부
					}
					const cookieStore = await cookies();
					const restoreInfo = stringToBase64(
						JSON.stringify({ email: dbUser.email, deletedAt: (dbUser as any).deleted_at })
					);
					cookieStore.set('restore-token', restoreInfo, {
						httpOnly: true,
						maxAge: 15 * 60,
						path: '/'
					});
					return '/auth/restore';
				}

				// credentials: provider 불일치 체크 불필요
				if (account?.provider !== 'credentials') {
					const registered = String(dbUser.provider ?? '').toUpperCase();
					const incoming = String(account?.provider ?? '').toUpperCase();
					if (registered && incoming && registered !== incoming) {
						return `/auth?error=provider_mismatch&registered=${encodeURIComponent(registered.toLowerCase())}`;
					}
				}

				return true;
			} catch {
				return false;
			}
		},
		async jwt({ token, user, account }) {
			if (user) {
				const isOAuth =
					account?.provider === 'google' || account?.provider === 'github';
				const { accessToken, refreshToken, userId } =
					await authService.signIn({
						...user,
						...(isOAuth && { provider: account!.provider.toUpperCase() })
					});
				token.email = user.email!;
				token.name = user.name!;
				token.userId = userId;
				token.role = (user as any).role;
				token.image = user.image!;
				token.accessToken = accessToken;
				token.refreshToken = refreshToken;
			}

			if (token.accessToken) {
				const decoded = jwtDecode(token.accessToken);
				if (decoded.exp && decoded.exp < Date.now() / 1000) {
					try {
						const { accessToken } = await authService.rotateToken(
							token.refreshToken
						);
						token.accessToken = accessToken;
					} catch {
						// refresh token 만료/무효 → 세션 무효화
						return null;
					}
				}
			}

			return token;
		},
		async session({ session, token }) {
			// 클라이언트에서 사용할 세션 필드 구성
			if (token && session.user) {
				try {
					const user = await userService.findUserById(token.userId);
					session.user.id = token.userId;
					session.user.userId = token.userId;
					session.user.role = token.role;
					session.user.name = user.user_name;
					session.user.image = token.image;
					session.accessToken = token.accessToken;
					session.refreshToken = token.refreshToken;
					(session.user as any).deletedAt = (user as any).deleted_at ?? null;
				} catch {
					// 유저 없음(404) 또는 백엔드 장애 → 세션 무효화
					return null as any;
				}
			}
			return session;
		}
	}
});
