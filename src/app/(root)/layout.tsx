import Header from '@/components/Layout/Header';
import PageLayout from '@/components/Layout/PageLayout';
import TabView from '@/components/Tab/TabView';
import TabLayout from '@/components/Layout/TabLayout';
import Tabs, { TabItem } from '@/components/Tab/Tabs';
import { MdOutlineTrendingUp, MdOutlineAccessTime, MdOutlineRssFeed } from 'react-icons/md';
import LayoutControl from '@/components/Layout/LayoutControl';
import QueryProvider from '@/components/QueryProvider';

export default async function Layout({ children }: { children: React.ReactNode }) {
	const res = await fetch('http://192.168.0.12:3001/tabs', { cache: 'force-cache' });

	if (!res.ok) {
		throw new Error('데이터 조회 중 에러가 발생하였습니다.');
	}

	const items: TabItem[] = await res.json();

	const icons: { [name: string]: React.ReactNode } = {
		trends: <MdOutlineTrendingUp size={24} />,
		new: <MdOutlineAccessTime size={24} />,
		feed: <MdOutlineRssFeed size={24} />
	};

	return (
		<QueryProvider>
			<div className="mx-auto">
				<PageLayout>
					<Header />
					<TabLayout>
						<TabView showOption={true}>
							<Tabs items={items} icons={icons} defaultPath="/trends" />
						</TabView>
						<TabView showOption={true} position="end" gap={2}>
							<LayoutControl />
						</TabView>
					</TabLayout>
					<div className="my-8 mx-auto px-4">{children}</div>
				</PageLayout>
			</div>
		</QueryProvider>
	);
}
