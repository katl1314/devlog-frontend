import CardSkeleton from './components/skeleton/card-skeleton';
import CardLayout from '@/components/layout/card-layout';
import PostList from '@/components/post/post-list';

import { Suspense } from 'react';

export const dynamicParams = false; // false 시 404페이지를 발생한다.

interface IPage {
	params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
	return [
		{ slug: 'new', text: '최신', href: '/new' },
		{ slug: 'trends', text: '트렌드', href: '/trends' }
	];
}

export default async function Page({ params }: IPage) {
	const { slug } = await params;
	return (
		<Suspense fallback={<PostCardFallback />}>
			<PostList />
		</Suspense>
	);
}

function PostCardFallback() {
	return (
		<CardLayout>
			{Array.from({ length: 10 }).map((_, index) => {
				return <CardSkeleton key={index} />;
			})}
		</CardLayout>
	);
}
