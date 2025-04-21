import PageLayout from '@/components/Layout/PageLayout';
import Header from './components/Header';
import { headers } from 'next/headers';
import { createClientByServer } from '@/utils/supabase/server';
import UserLayout from '@/components/Layout/UserLayout';
import UserProfile from './components/UserProfile';
import UserProfileBottom from './components/UserProfileBottom';
import { Separator } from '@/components/ui/separator';

export default async function Layout({ children }: { children: React.ReactNode }) {
	const supabase = await createClientByServer();
	const headerList = await headers();
	const pathname = headerList.get('x-pathname') || '';
	const userId = pathname.substring(pathname.indexOf('@') + 1);
	const { error, data } = await supabase.from('profiles').select().eq('userId', userId).single();

	if (error) throw new Error(error.message);

	return (
		<PageLayout>
			<Header userId={userId} />
			<UserLayout>
				<UserProfile {...data} />
				<Separator className="mt-[20px]" />
				<UserProfileBottom userId={userId} />
				<div className="my-8 mx-auto px-4">{children}</div>
			</UserLayout>
		</PageLayout>
	);
}
