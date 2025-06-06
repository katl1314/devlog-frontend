import UserLayout from '@/components/Layout/UserLayout';
import './init.css';

export default async function Layout({ children }: { children: React.ReactNode }) {
	return (
		<UserLayout>
			<main className="relative">{children}</main>
		</UserLayout>
	);
}
