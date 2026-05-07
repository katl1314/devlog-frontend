'use client';

import InfiniteList from '@/components/infinite-list';
import PostCard from '@/components/post/post-card';
import { postService } from '@/services/post.service';
import { useSession } from 'next-auth/react';
import { BiGroup } from 'react-icons/bi';
import Link from 'next/link';

export default function FollowingPostList() {
	const { data: session } = useSession();
	const accessToken = session?.accessToken ?? '';

	const queryKey = ['posts', 'following'];

	const queryFn = ({ pageParam = 0 }: { pageParam?: unknown }) => {
		const cursor = pageParam as number;
		return postService.getFollowingFeed(cursor, accessToken).then(res => ({
			posts: res.data,
			nextCursor: res.cursor.after
		}));
	};

	return (
		<InfiniteList queryKey={queryKey} queryFn={queryFn}>
			<InfiniteList.Item render={(post) => <PostCard {...post} />} />
			<InfiniteList.Empty>
				<div className="flex flex-col items-center justify-center py-24 text-center px-6">
					<div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-5">
						<BiGroup size={28} className="text-muted-foreground" />
					</div>
					<p className="text-base font-semibold text-foreground">아직 팔로우한 사용자가 없습니다</p>
					<p className="mt-1.5 text-sm text-muted-foreground">
						다른 사용자를 팔로우하면 새 포스트를 모아볼 수 있습니다
					</p>
					<Link
						href="/new"
						className="mt-6 px-6 py-2.5 bg-foreground text-background text-sm font-semibold rounded-full hover:opacity-85 transition-opacity cursor-pointer"
					>
						피드 탐색하기
					</Link>
				</div>
			</InfiniteList.Empty>
		</InfiniteList>
	);
}
