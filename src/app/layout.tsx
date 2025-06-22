import type { Metadata } from 'next';
import './globals.css';
import { Fira_Mono } from 'next/font/google';
import { createClientByServer } from '@/utils/supabase/server';
import UserInit from '@/components/UserInit';
import { User } from '@/types/type';
import { Toaster } from '@/components/ui/sonner';
import ThemeProvider from '@/components/ThemeProvider';
import ThemeToggle from '@/components/ThemeToggle';

const inter = Fira_Mono({
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

export default async function RootLayout({ children, modal }: Readonly<IRootLayout>) {
	const supabase = await createClientByServer();
	const session = await supabase.auth.getUser();
	const id = session.data.user?.id;
	const user = await supabase.from('profiles').select().match({ id }).single();

	return (
		<UserInit user={user.data as User}>
			<html lang="ko">
				<body className={`${inter.className} relative`}>
					<ThemeToggle />
					<ThemeProvider />
					{children}
					{modal}
					<div id="modal" className="absolute top-0"></div>
					<Toaster position="top-right" closeButton={true} />
				</body>
			</html>
		</UserInit>
	);
}
