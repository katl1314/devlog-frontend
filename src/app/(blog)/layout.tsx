import PageLayout from '@/components/layout/page-layout';
import { PropsWithChildren } from 'react';

export default async function Layout({ children }: PropsWithChildren) {
	return (
		<PageLayout>
			{children}
		</PageLayout>
	);
}