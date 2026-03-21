import PageLayout from '@/components/layout/page-layout';
import { PropsWithChildren } from 'react';
import Header from '../(root)/components/header';

export default async function Layout({ children }: PropsWithChildren) {
	return (
		<>
			<Header />
			<PageLayout>
				<>{children}</>
			</PageLayout>
		</>
	);
}
