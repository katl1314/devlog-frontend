import { Suspense } from 'react';
import PostCardSkeleton from '@/components/Skeleton/PostCardSkeleton';
import PostCardList from '@/components/PostCardList';
import CardLayout from '@/components/Layout/CardLayout';
import { createClientByBrowser } from '@/utils/supabase/client';

// generatedStaticParams로 생성되지 않은 정적 페이지에 접근 시 제어한다.
export const dynamicParams = false; // false 시 404페이지를 발생한다.

interface Page {
	params: Promise<{ tab: string }>;
}

export async function generateStaticParams() {
	const supabase = createClientByBrowser();
	const { data, error } = await supabase.from('tabs').select();

	if (error) throw new Error(error.message);

	return data;
}

export default async function Page({ params }: Page) {
	const { tab } = await params;

	return (
		<Suspense fallback={<PostCardFallback />}>
			<PostCardList tab={tab} />
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
