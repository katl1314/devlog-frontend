import { Suspense } from 'react';
import PostCardSkeleton from '@/components/Skeleton/PostCardSkeleton';
import PostCardList from '@/components/PostCardList';
import CardLayout from '@/components/Layout/CardLayout';
import { createClientByBrowser } from '@/utils/supabase/client';

export const dynamicParams = false; // false 시 404페이지를 발생한다.

interface IPage {
	params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
	const supabase = createClientByBrowser();
	const { data, error } = await supabase.from('tabs').select().eq('isUse', 'Y');

	if (error) throw new Error(error.message);
	const params = data.map(({ tab, text, href }) => ({ slug: tab, text, href }));

	return params;
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
