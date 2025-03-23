import CardLayout from '@/components/Layout/CardLayout';
import { Suspense } from 'react';
import PostCardSkeleton from '@/components/Skeleton/PostCardSkeleton';
import PostCardList from '@/components/PostCardList';

export const dynamicParams = false; // Static Side Generate형태로 빌드된다.

interface Page {
	params: Promise<{ tab: string }>;
}

export async function generateStaticParams() {
	try {
		const url = 'http://localhost:3001/tabs';
		const res = await fetch(url, { cache: 'force-cache' });
		const data = await res.json();
		return data;
	} catch (err) {
		console.error(err);
	}
}

export default async function Page({ params }: Page) {
	const { tab } = await params;

	return (
		<CardLayout>
			<Suspense fallback={<PostCardFallback />}>
				<PostCardList tab={tab} />
			</Suspense>
		</CardLayout>
	);
}

function PostCardFallback() {
	return (
		<>
			{Array.from({ length: 10 }).map((_, index) => {
				return <PostCardSkeleton key={index} />;
			})}
		</>
	);
}
