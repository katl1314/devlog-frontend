import QueryProvider from '@/components/QueryProvider';

export default async function Layout({ children }: { children: React.ReactNode }) {
	return (
		<QueryProvider>
			<div className="mx-auto">{children}</div>
		</QueryProvider>
	);
}
