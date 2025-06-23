import { createClientByBrowser } from '@/utils/supabase/client';
import { Suspense } from 'react';
import PostList from '../components/PostList';
import { Metadata } from 'next';
import PostSkeleton from '@/components/skeleton/PostSkeleton';

export async function generateStaticParams() {
	const supabase = createClientByBrowser();
	const { error, data } = await supabase.from('profiles').select();
	if (error) throw new Error(error.message);
	return data.map(({ userId }) => ({ slug: userId }));
}

export const dynamicParams = false;

type Props = {
	params: Promise<{ slug: string }>;
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;

	return {
		title: `${slug}의 포스트`,
		description: `${slug}의 포스트입니다.`
	};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
	const userId = (await params).slug;
	return (
		<Suspense fallback={<PostFallback />}>
			<PostList userId={userId} />
		</Suspense>
	);
}

function PostFallback() {
	return (
		<div>
			{Array.from({ length: 10 }).map((_, index) => {
				return <PostSkeleton key={index} />;
			})}
		</div>
	);
}
