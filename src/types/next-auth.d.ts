import { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth/jwt' {
	interface JWT {
		email: string;
		userId: string;
		role: string;
		image: string;
		accessToken: string;
		refreshToken: string;
	}
}

declare module 'next-auth' {
	interface Session {
		user: {
			id?: string;
			userId?: string;
			role?: string;
		} & DefaultSession['user'];
		accessToken?: string;
		refreshToken?: string;
	}
}
