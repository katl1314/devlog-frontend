import TabView from '@/components/Tab/TabView';
import TabLayout from '@/components/layout/TabLayout';
import Tabs, { TabItem } from '@/components/Tab/Tabs';
import {
	MdOutlineTrendingUp,
	MdOutlineAccessTime,
	MdOutlineRssFeed
} from 'react-icons/md';

export default async function Layout({
	children
}: {
	children: React.ReactNode;
}) {
	const icons: { [name: string]: React.ReactNode } = {
		trends: <MdOutlineTrendingUp size={24} />,
		new: <MdOutlineAccessTime size={24} />,
		feed: <MdOutlineRssFeed size={24} />
	};

	const data: TabItem[] = [
		{ href: '/new', tab: 'new', text: '최신' },
		{ href: '/trends', tab: 'trends', text: '트렌드' }
	];

	return (
		<>
			<TabLayout className="tablayout">
				<TabView showOption={true}>
					<Tabs items={data as TabItem[]} icons={icons} defaultPath="/new" />
				</TabView>
			</TabLayout>
			<div className="my-8 mx-auto px-4">{children}</div>
		</>
	);
}
