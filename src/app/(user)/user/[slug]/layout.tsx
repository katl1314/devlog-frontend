import UserLayout from '@/components/layout/UserLayout';
import UserProfile from '../components/UserProfile';
import UserProfileBottom from '../components/UserProfileBottom';
import { Card } from '@/components/ui/card';
import { headers } from 'next/headers';

export default async function Layout({
	children
}: {
	children: React.ReactNode;
}) {
	const headerList = await headers();
	const pathname = headerList.get('x-pathname') || '';
	const userId = pathname.substring(pathname.indexOf('@') + 1);

	return (
		<UserLayout>
			<Card className="p-2 rounded-[0px] lg:p-0 lg:bg-transparent lg:shadow-none lg:border-0">
				{/* <UserProfile {...data} /> */}
				<UserProfileBottom />
			</Card>
			<Card className="mt-4 p-2 rounded-[0px] lg:mt-6 lg:p-0 lg:bg-transparent lg:shadow-none lg:border-0">
				<section className="min-h-[500px]">{children}</section>
			</Card>
		</UserLayout>
	);
}
