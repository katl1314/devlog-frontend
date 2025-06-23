import QueryProvider from '@/components/state/QueryProvider';
import Header from '@/components/layout/Header';
import PageLayout from '@/components/layout/PageLayout';

export default async function Layout({ children }: { children: React.ReactNode }) {
	return (
		<QueryProvider>
			<PageLayout>
				<Header />
				<div className="mx-auto">{children}</div>
			</PageLayout>
		</QueryProvider>
	);
}
