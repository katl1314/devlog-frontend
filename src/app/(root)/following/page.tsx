import { Suspense } from 'react';
import { Metadata } from 'next';
import { auth } from '@/auth';
import CardLayout from '@/components/layout/card-layout';
import CardSkeleton from '../[slug]/components/skeleton/card-skeleton';
import FollowingPostList from './components/following-post-list';
import Link from 'next/link';
import { BiGroup } from 'react-icons/bi';

export const metadata: Metadata = {
	title: '팔로잉',
	description: '팔로우한 사용자의 최신 포스트를 모아봅니다.'
};

export default async function FollowingPage() {
	const session = await auth();

	return (
		<>
			<div className="sticky top-0 z-10 flex items-center px-6 h-[60px] bg-background/80 backdrop-blur-xl border-b border-border/50">
				<h2 className="text-lg font-bold tracking-tight">팔로잉</h2>
			</div>

			{session ? (
				<Suspense fallback={<FollowingFallback />}>
					<FollowingPostList />
				</Suspense>
			) : (
				<div className="flex flex-col items-center justify-center py-24 text-center px-6">
					<div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-5">
						<BiGroup size={28} className="text-muted-foreground" />
					</div>
					<p className="text-base font-semibold text-foreground">로그인이 필요합니다</p>
					<p className="mt-1.5 text-sm text-muted-foreground">
						팔로잉 피드를 보려면 먼저 로그인해 주세요
					</p>
					<Link
						href="/auth"
						className="mt-6 px-6 py-2.5 bg-foreground text-background text-sm font-semibold rounded-full hover:opacity-85 transition-opacity cursor-pointer"
					>
						로그인
					</Link>
				</div>
			)}
		</>
	);
}

function FollowingFallback() {
	return (
		<CardLayout>
			{Array.from({ length: 5 }).map((_, i) => (
				<CardSkeleton key={i} />
			))}
		</CardLayout>
	);
}
