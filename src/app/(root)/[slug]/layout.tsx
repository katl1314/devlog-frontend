import TabView from '@/components/Tab/TabView';
import TabLayout from '@/components/Layout/TabLayout';
import Tabs, { TabItem } from '@/components/Tab/Tabs';
import { MdOutlineTrendingUp, MdOutlineAccessTime, MdOutlineRssFeed } from 'react-icons/md';
import LayoutControl from '@/components/Layout/LayoutControl';
import { createClientByServer } from '@/utils/supabase/server';

export default async function Layout({ children }: { children: React.ReactNode }) {
	const supabase = await createClientByServer();

	const { error, data } = await supabase.from('tabs').select().eq('isUse', 'Y');

	if (error) {
		throw new Error(error.message);
	}

	const icons: { [name: string]: React.ReactNode } = {
		trends: <MdOutlineTrendingUp size={24} />,
		new: <MdOutlineAccessTime size={24} />,
		feed: <MdOutlineRssFeed size={24} />
	};

	return (
		<>
			<TabLayout>
				<TabView showOption={true}>
					<Tabs items={data as TabItem[]} icons={icons} defaultPath="/trends" />
				</TabView>
				<TabView showOption={true} position="end" gap={2}>
					<LayoutControl />
				</TabView>
			</TabLayout>
			<div className="my-8 mx-auto px-4">{children}</div>
		</>
	);
}
