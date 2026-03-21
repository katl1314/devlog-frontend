'use client';

import { postService } from '@/services/post.service';
import PostCard from '@/components/post/post-card';
import CardLayout from '@/components/layout/card-layout';
import useFetch from '@/hooks/fetch';

export default function UserPostCardList({ userId }: { userId: string }) {
	const { data, lastPostRef } = useFetch({
		initialPageParam: 0,
		queryKey: ['posts', userId],
		getNextPageParam: (lastPage) => lastPage.nextCursor ? lastPage.nextCursor - 1 : undefined,
		queryFn: ({ pageParam = 0 }) => postService.getListByUser(userId, pageParam).then(res => ({
			posts: res.data,
			nextCursor: res.cursor.after,
		})),
	});

	return (
		<CardLayout>
			{data.pages.map(({ posts }) =>
				posts.map((post, index) => {
					const isLastItem = index === posts.length - 1;
					return (
						<div key={post.path} ref={isLastItem ? lastPostRef : null}>
							<PostCard {...post} />
						</div>
					);
				})
			)}
		</CardLayout>
	);
}
