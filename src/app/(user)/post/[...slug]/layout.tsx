import UserLayout from '@/components/Layout/UserLayout';

export default async function Layout({ children }: { children: React.ReactNode }) {
	return (
		<UserLayout>
			<>{children}</>
		</UserLayout>
	);
}
