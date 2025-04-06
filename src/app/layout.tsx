import type { Metadata } from 'next';
import './globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import { createClientByServer } from '@/utils/supabase/server';
import UserInit from '@/components/UserInit';
import { Database } from '../../database.types';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
});

export const metadata: Metadata = {
	title: 'Devs.log',
	description: 'Devs.log 페이지 입니다.'
};

interface RootLayout {
	children: React.ReactNode;
	modal: React.ReactNode;
}

type Profile = Partial<Database['public']['Tables']['profiles']['Row']>;

export default async function RootLayout({ children, modal }: Readonly<RootLayout>) {
	const supabase = await createClientByServer();
	const session = await supabase.auth.getUser();
	const id = session.data.user?.id;
	const user = await supabase.from('profiles').select().match({ id }).single();
	return (
		<UserInit user={user.data as Profile}>
			<html lang="ko">
				<body className={`${geistSans.variable} ${geistMono.variable} relative`}>
					{children}
					{modal}
					<div id="modal" className="absolute top-0"></div>
				</body>
			</html>
		</UserInit>
	);
}
