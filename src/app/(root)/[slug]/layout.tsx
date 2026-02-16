import Tabview from '@/components/tab/tabview';
import Tabs, { TabItem } from '@/components/tab/tabs';
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
			<div className="sticky top-0 bg-(--background)">
				<Tabview showOption={true}>
					<Tabs items={data as TabItem[]} icons={icons} defaultPath="/new" />
				</Tabview>
			</div>
			<div className="my-8 mx-auto px-4">{children}</div>
		</>
	);
}
