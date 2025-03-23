import CardLayout from '@/components/Layout/CardLayout';
import { Suspense } from 'react';
import PostCardSkeleton from '@/components/Skeleton/PostCardSkeleton';
import PostCardList from '@/components/PostCardList';

// generatedStaticParams로 생성되지 않은 정적 페이지에 접근 시 제어한다.
export const dynamicParams = false; // false 시 404페이지를 발생한다.

interface Page {
	params: Promise<{ tab: string }>;
}

export async function generateStaticParams() {
	try {
		const url = 'http://localhost:3001/tabs';
		const res = await fetch(url, { cache: 'force-cache' });

		if (!res.ok) throw new Error('데이터 조회 중 에러가 발생하였습니다.');
		return await res.json();
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
