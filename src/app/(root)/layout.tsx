import QueryProvider from '@/components/QueryProvider';
import Header from '@/components/Layout/Header';
import PageLayout from '@/components/Layout/PageLayout';

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
