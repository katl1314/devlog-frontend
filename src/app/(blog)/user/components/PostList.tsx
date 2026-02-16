'use client';

import { QueryFunction, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { fetchPostsFncByUser, FetchPostsResponseUser } from '@/types/type';
import { useCallback, useRef } from 'react';
import PostCard from './PostCard';

// 데이터를 fetch하는 함수
const fetchPosts: fetchPostsFncByUser = async ({ userId, cursor = 0 }) => {
	console.log(userId, cursor);
	return { posts: [], hasMore: [].length > 0 };
};

export default function PostList({ userId }: { userId: string }) {
	const queryFn: QueryFunction<
		FetchPostsResponseUser,
		readonly unknown[],
		unknown
	> = ({ pageParam = 0 }) =>
		fetchPosts({ userId, cursor: pageParam as number });

	const { data, fetchNextPage, hasNextPage } =
		useSuspenseInfiniteQuery<FetchPostsResponseUser>({
			queryKey: ['posts', userId],
			queryFn,
			initialPageParam: 0,
			getNextPageParam: (lastPage, allPages) =>
				lastPage.hasMore ? allPages.length * 10 : undefined
		});

	const observer = useRef<IntersectionObserver>(null);

	// 콜백함수 메모이제이션
	const lastPostRef = useCallback(
		(node: HTMLDivElement) => {
			if (observer.current) observer.current.disconnect();

			if (node && hasNextPage) {
				const observeCallback: IntersectionObserverCallback = ([entry]) => {
					if (entry.isIntersecting) fetchNextPage(); // observer에 정의한 target이 감지되었으면?
				};
				observer.current = new IntersectionObserver(observeCallback);
				observer.current.observe(node);
			}
		},
		[hasNextPage, fetchNextPage]
	);

	return (
		<>
			{data.pages.map(({ posts }) =>
				posts.map((post, index) => {
					const isLastItem = index === posts.length - 1;
					return (
						<div key={post.path} ref={isLastItem ? lastPostRef : null}>
							{<PostCard {...post} />}
						</div>
					);
				})
			)}
		</>
	);
}
