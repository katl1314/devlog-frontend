import PostCardSkeleton from '@/components/skeleton/PostCardSkeleton';
import CardLayout from '@/components/layout/CardLayout';
import { Suspense } from 'react';
import PostCardList from '@/components/Post/PostCardList';

export const dynamicParams = false; // false 시 404페이지를 발생한다.

interface IPage {
	params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
	return [{ slug: 'new', text: '최신', href: '/' }];
}

export default async function Page({ params }: IPage) {
	const { slug } = await params;
	return (
		<Suspense fallback={<PostCardFallback />}>
			<PostCardList tab={slug} />
		</Suspense>
	);
}

function PostCardFallback() {
	return (
		<CardLayout>
			{Array.from({ length: 10 }).map((_, index) => {
				return <PostCardSkeleton key={index} />;
			})}
		</CardLayout>
	);
}
