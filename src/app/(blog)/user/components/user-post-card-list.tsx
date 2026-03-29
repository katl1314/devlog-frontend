'use client';

import { postService } from '@/services/post.service';
import PostCard from '@/components/post/post-card';
import CardLayout from '@/components/layout/card-layout';
import useFetch from '@/hooks/fetch';
import { FetchPostsResponse } from '@/types/type';

export default function UserPostCardList({ userId }: { userId: string }) {
	const { data, lastPostRef } = useFetch({
		initialPageParam: 0,
		queryKey: ['posts', userId],
		getNextPageParam: lastPage =>
			lastPage.nextCursor ? lastPage.nextCursor - 1 : undefined,
		queryFn: ({ pageParam = 0 }) =>
			postService.getListByUser(userId, pageParam).then(res => ({
				posts: res.data,
				nextCursor: res.cursor.after
			}))
	});

	const isEmpty = data.pages[0].posts.length < 1;
	return (
		<CardLayout>
			{isEmpty ? (
				<p>포스트가 없습니다.</p>
			) : (
				<PostsCardItems pages={data.pages} lastPostRef={lastPostRef} />
			)}
		</CardLayout>
	);
}

const PostsCardItems = ({
	pages,
	lastPostRef
}: {
	pages: FetchPostsResponse[];
	lastPostRef: (node: HTMLDivElement) => void;
}) => {
	return (
		<>
			{pages.map(({ posts }) =>
				posts.map((post, index) => {
					const isLastItem = index === posts.length - 1;
					return (
						<div key={post.path} ref={isLastItem ? lastPostRef : null}>
							<PostCard {...post} />
						</div>
					);
				})
			)}
		</>
	);
};
