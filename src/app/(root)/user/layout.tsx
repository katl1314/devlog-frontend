'use client';
import PageLayout from '@/components/Layout/PageLayout';
import Header from './components/Header';
import { usePathname } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
	const pathaname = usePathname();
	console.log(pathaname);
	return (
		<PageLayout>
			<Header slug={pathaname as string} />
			<div className="my-8 mx-auto px-4">{children}</div>
		</PageLayout>
	);
}
