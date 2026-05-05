import { BiGroup } from 'react-icons/bi';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
	title: '팔로잉',
	description: '팔로우한 사용자의 최신 포스트를 모아봅니다.'
};

export default function FollowingPage() {
	return (
		<>
			<div className="sticky top-0 z-10 flex items-center px-6 h-[60px] bg-background/80 backdrop-blur-xl border-b border-border/50">
				<h2 className="text-lg font-bold tracking-tight">팔로잉</h2>
			</div>

			<div className="flex flex-col items-center justify-center py-24 text-center px-6">
				<div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-5">
					<BiGroup size={28} className="text-muted-foreground" />
				</div>
				<p className="text-base font-semibold text-foreground">아직 팔로우한 사용자가 없습니다</p>
				<p className="mt-1.5 text-sm text-muted-foreground">다른 사용자를 팔로우하면 새 포스트를 모아볼 수 있습니다</p>
				<Link
					href="/new"
					className="mt-6 px-6 py-2.5 bg-foreground text-background text-sm font-semibold rounded-full hover:opacity-85 transition-opacity cursor-pointer"
				>
					피드 탐색하기
				</Link>
			</div>
		</>
	);
}
