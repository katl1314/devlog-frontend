import PageLayout from '@/components/layout/PageLayout';
import Header from '@/app/(root)/components/header';

export default async function Layout({ children }: { children: React.ReactNode }) {
	return (
		<PageLayout>
			<Header />
			<div className="mx-auto">{children}</div>
		</PageLayout>
	);
}
