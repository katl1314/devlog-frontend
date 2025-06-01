import PageLayout from '@/components/Layout/PageLayout';
import Header from './user/components/Header';
import QueryProvider from '@/components/QueryProvider';
import { headers } from 'next/headers';

export default async function Layout({ children }: { children: React.ReactNode }) {
	const headerList = await headers();
	const pathname = headerList.get('x-pathname') || '';
	const userId = pathname.substring(pathname.indexOf('@') + 1);
	return (
		<QueryProvider>
			<PageLayout>
				<Header userId={userId} />
				<div className="mx-auto">{children}</div>
			</PageLayout>
		</QueryProvider>
	);
}
