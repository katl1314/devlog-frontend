import Header from '@/components/Layout/Header';
import PageLayout from '@/components/Layout/PageLayout';
import QueryProvider from '@/components/QueryProvider';
import React from 'react';

export default async function Layout({ children }: { children: React.ReactNode }) {
	return (
		<QueryProvider>
			<div className="mx-auto">
				<PageLayout>
					<Header />
					<div className="my-8 mx-auto px-4">{children}</div>
				</PageLayout>
			</div>
		</QueryProvider>
	);
}
