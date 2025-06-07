import { headers } from 'next/headers';
import { createClientByServer } from '@/utils/supabase/server';
import UserLayout from '@/components/Layout/UserLayout';
import UserProfile from '../components/UserProfile';
import UserProfileBottom from '../components/UserProfileBottom';
import { Card } from '@/components/ui/card';

export default async function Layout({ children }: { children: React.ReactNode }) {
	const supabase = await createClientByServer();
	const headerList = await headers();
	const pathname = headerList.get('x-pathname') || '';
	const userId = pathname.substring(pathname.indexOf('@') + 1);
	const { error, data } = await supabase.from('profiles').select().eq('userId', userId).single();

	if (error) throw new Error(error.message);

	return (
		<UserLayout>
			<Card className="p-2 rounded-[0px] lg:p-0 lg:bg-transparent lg:shadow-none lg:border-0">
				<UserProfile {...data} />
				<UserProfileBottom userId={userId} />
			</Card>
			<Card className="mt-4 p-2 rounded-[0px] lg:mt-6 lg:p-0 lg:bg-transparent lg:shadow-none lg:border-0">
				<section className="min-h-[500px]">{children}</section>
			</Card>
		</UserLayout>
	);
}
