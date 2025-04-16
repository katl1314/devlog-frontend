import PageLayout from '@/components/Layout/PageLayout';
import Header from './components/Header';
// 서버컴포넌트에서 pathname가져오기
import { headers } from 'next/headers';

export default async function Layout({ children }: { children: React.ReactNode }) {
	const headerList = await headers();
	const pathname = headerList.get('x-pathname') || '';
	const userId = pathname.substring(pathname.indexOf('@') + 1);
	return (
		<PageLayout>
			<Header userId={userId} />
			<div className="my-8 mx-auto px-4">{children}</div>
		</PageLayout>
	);
}
