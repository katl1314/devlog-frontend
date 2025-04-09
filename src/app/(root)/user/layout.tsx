'use client';
import PageLayout from '@/components/Layout/PageLayout';
import Header from './components/Header';
import { useParams } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
	const { userId } = useParams();
	return (
		<PageLayout>
			<Header userId={userId as string} />
			<div className="my-8 mx-auto px-4">{children}</div>
		</PageLayout>
	);
}
