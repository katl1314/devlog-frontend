'use client';

import { postService } from '@/services/post.service';
import PostCard from '@/components/post/post-card';
import CardLayout from '@/components/layout/card-layout';
import useFetch from '@/hooks/fetch';
import { useSession } from 'next-auth/react';

export default function PostCardList() {
	const { data: session } = useSession();
	const accessToken = (session as any)?.accessToken as string | undefined;

	const { data, lastPostRef } = useFetch({
		initialPageParam: 0,
		queryKey: ['posts', accessToken ?? 'anonymous'],
		getNextPageParam: lastPage =>
			lastPage.nextCursor ? lastPage.nextCursor - 1 : undefined,
		queryFn: ({ pageParam = 0 }) =>
			postService.getList(pageParam as number, accessToken).then(posts => ({
				posts: posts.data,
				nextCursor: posts.cursor.after
			}))
	});

	return (
		<CardLayout>
			{data.pages.map(({ posts }) =>
				posts.map((post: any, index: number) => {
					return (
						<div
							key={post.id}
							ref={index === posts.length - 1 ? lastPostRef : null}
						>
							{<PostCard {...post} />}
						</div>
					);
				})
			)}
		</CardLayout>
	);
}
