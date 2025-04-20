import PageLayout from '@/components/Layout/PageLayout';
import Header from './components/Header';
import { headers } from 'next/headers';
import { createClientByServer } from '@/utils/supabase/server';
import { MdOutlineAccessTime, MdOutlineRssFeed, MdOutlineTrendingUp } from 'react-icons/md';
import TabLayout from '@/components/Layout/TabLayout';
import TabView from '@/components/Tab/TabView';
import Tabs, { TabItem } from '@/components/Tab/Tabs';
import UserLayout from '@/components/Layout/UserLayout';
import UserProfile from './components/UserProfile';
import UserProfileBottom from './components/UserProfileBottom';
import { Separator } from '@/components/ui/separator';

export default async function Layout({ children }: { children: React.ReactNode }) {
	const supabase = await createClientByServer();
	const headerList = await headers();
	const pathname = headerList.get('x-pathname') || '';
	const userId = pathname.substring(pathname.indexOf('@') + 1);
	const { error, data } = await supabase.from('tabs').select().eq('isUse', 'Y');
	const { data: user } = await supabase.from('profiles').select().eq('userId', userId).single();

	if (error) throw new Error(error.message);

	const icons: { [name: string]: React.ReactNode } = {
		trends: <MdOutlineTrendingUp size={24} />,
		new: <MdOutlineAccessTime size={24} />,
		feed: <MdOutlineRssFeed size={24} />
	};

	return (
		<PageLayout>
			<Header userId={userId} />
			<UserLayout>
				<UserProfile {...user} />
				<UserProfileBottom userId={userId} />
				<Separator className="mt-[20px]" />
				<TabLayout className="mt-8">
					<TabView showOption={true}>
						<Tabs items={data as TabItem[]} icons={icons} defaultPath="/trends" />
					</TabView>
				</TabLayout>
				<div className="my-8 mx-auto px-4">{children}</div>
			</UserLayout>
		</PageLayout>
	);
}
