import PageLayout from '@/components/layout/PageLayout';
import Header from './user/components/Header';
import QueryProvider from '@/components/state/QueryProvider';
import { headers } from 'next/headers';
import { searchUser } from '@/lib/db';

export default async function Layout({
	children
}: {
	children: React.ReactNode;
}) {
	const headerList = await headers();
	const pathname = headerList.get('x-pathname') || '';
	const userId = pathname.substring(pathname.indexOf('@') + 1).split('/')[0];
	const { blog } = await searchUser(userId);
	return (
		<QueryProvider>
			<PageLayout>
				<Header userId={userId} title={blog.title} />
				<div className="mx-auto">{children}</div>
			</PageLayout>
		</QueryProvider>
	);
}
