'use client';

import { postService } from '@/services/post.service';
import PostCard from '@/components/post/post-card';
import CardLayout from '@/components/layout/card-layout';
import useFetch from '@/hooks/fetch';

const fetchPosts: any = async ({ cursor = 0 }) => {
	const posts = await postService.getList(cursor);
	return { posts: posts.data, nextCursor: posts.cursor.after };
};

export default function PostCardList() {
	const { data, lastPostRef } = useFetch({
		initialPageParam: 0,
		queryKey: ['posts'],
		getNextPageParam: lastPage =>
			lastPage.nextCursor ? lastPage.nextCursor - 1 : undefined,
		queryFn: ({ pageParam = 0 }) => fetchPosts({ cursor: pageParam })
	});

	return (
		<CardLayout>
			{data.pages.map(({ posts }) =>
				posts.map((post: any, index: number) => {
					const isLastItem = index === posts.length - 1;
					return (
						<div key={post.path} ref={isLastItem ? lastPostRef : null}>
							{<PostCard {...post} />}
						</div>
					);
				})
			)}
		</CardLayout>
	);
}
