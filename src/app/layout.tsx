import type { Metadata } from 'next';
import './globals.css';
import { Inter_Tight } from 'next/font/google';
import { createClientByServer } from '@/utils/supabase/server';
import UserInit from '@/components/UserInit';
import { User } from '@/types/type';

const inter = Inter_Tight({
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

export default async function RootLayout({ children, modal }: Readonly<RootLayout>) {
	const supabase = await createClientByServer();
	const session = await supabase.auth.getUser();
	const id = session.data.user?.id;
	const user = await supabase.from('profiles').select().match({ id }).single();
	return (
		<UserInit user={user.data as User}>
			<html lang="ko">
				<body className={`${inter.className} relative`}>
					{children}
					{modal}
					<div id="modal" className="absolute top-0"></div>
				</body>
			</html>
		</UserInit>
	);
}
