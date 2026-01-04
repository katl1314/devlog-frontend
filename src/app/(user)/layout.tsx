import QueryProvider from '@/components/state/QueryProvider';
import PageLayout from '@/components/layout/PageLayout';

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {

	return (
			<PageLayout>
				{children}
			</PageLayout>
	);
}

// return (
// 	<QueryProvider>
// 		<PageLayout>
// 			{children}
// 		</PageLayout>
// 	</QueryProvider>
// );