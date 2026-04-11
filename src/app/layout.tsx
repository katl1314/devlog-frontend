import type { Metadata } from 'next';
import Providers from '@/components/providers';
import { Roboto } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import ThemeProvider from '@/components/theme/theme-provider';
import { auth } from '@/auth';
import { Session } from 'next-auth';
import { userService } from '@/services/user.service';
import { Themes } from '@/hooks/theme';
import './globals.css';

const inter = Roboto({
	weight: '400',
	subsets: ['latin']
});

export const metadata: Metadata = {
	title: 'Devs.log',
	description: 'Devs.log 페이지 입니다.'
};

interface IRootLayout {
	children: React.ReactNode;
	modal: React.ReactNode;
}

export default async function RootLayout({
	children,
	modal
}: Readonly<IRootLayout>) {
	const session = (await auth()) as (Session & { accessToken: string }) | null;

	let initialTheme: Themes = 'system';
	if (session?.user && session.accessToken) {
		const user = session.user as any;
		try {
			const settings = await userService.getSettings(user.id, session.accessToken);
			initialTheme = (settings?.theme?.toLowerCase() as Themes) ?? 'system';
		} catch {
			// 설정 조회 실패 시 system 기본값 유지
		}
	}

	return (
		<html lang="ko">
			<body className={`${inter.className} relative`}>
				<Providers session={session}>
					<ThemeProvider initialTheme={initialTheme} />
					{children}
					{modal}
					<div id="modal" className="absolute top-0"></div>
					<Toaster position="top-right" closeButton={true} />
				</Providers>
			</body>
		</html>
	);
}
