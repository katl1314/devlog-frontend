import PageLayout from '@/components/Layout/PageLayout';
import QueryProvider from '@/components/QueryProvider';
import React from 'react';
import Header from './components/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<QueryProvider>
			<div className="mx-auto">
				<PageLayout>
					<Header />
					<div className="my-8 mx-auto px-10">{children}</div>
				</PageLayout>
			</div>
		</QueryProvider>
	);
}
