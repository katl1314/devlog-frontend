import type { Metadata } from 'next';
import Providers from '@/components/providers';
import { Roboto } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import ThemeProvider from '@/components/theme/theme-provider';
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
	return (
		<html lang="ko">
			<body className={`${inter.className} relative`}>
				<Providers>
					<ThemeProvider />
					{children}
					{modal}
					<div id="modal" className="absolute top-0"></div>
					<Toaster position="top-right" closeButton={true} />
				</Providers>
			</body>
		</html>
	);
}
