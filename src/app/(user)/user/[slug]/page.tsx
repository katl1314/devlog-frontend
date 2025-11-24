import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Metadata } from 'next';
import PostSkeleton from '@/components/skeleton/PostSkeleton';

// PRIVATE 포스트의 RLS 정책으로 인한 hydration 에러 방지를 위해 클라이언트에서만 렌더링
const PostList = dynamic(() => import('../components/PostList'), {
	ssr: false
});

export async function generateStaticParams() {}

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

export default async function Page({
	params
}: {
	params: Promise<{ slug: string }>;
}) {
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
