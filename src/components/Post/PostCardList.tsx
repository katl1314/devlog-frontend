'use client';

import {useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { FetchPostsResponse } from '@/types/type';
import { postService } from '@/services/post.service';
import PostCard from '@/components/Post/PostCard';
import CardLayout from '../layout/CardLayout';
import { useCallback, useRef } from 'react';

const fetchPosts: any = async ({ cursor = 0 }) => {
	const posts = await postService.getList(cursor);
	return { posts: posts.data, nextCursor: posts.cursor.after }
};

export default function PostCardList() {
	const { data, fetchNextPage, hasNextPage } =
		useSuspenseInfiniteQuery<FetchPostsResponse>({
			queryKey: ['posts'], // 쿼리의 고유 키, 캐싱/리패칭 기준 일반적으로 배열 (어떤 게시물의 쿼리인가)
			getNextPageParam: (lastPage) => lastPage.nextCursor ? lastPage.nextCursor - 1 :  undefined,
			queryFn:  ({ pageParam = 0 }) => fetchPosts({ cursor: pageParam as number }),
			initialPageParam: 0, // 초기값
		});

	const observer = useRef<IntersectionObserver>(null);

	// 콜백함수 메모이제이션
	const lastPostRef = useCallback(
		(node: HTMLDivElement) => {
			if (observer.current) observer.current.disconnect();

			if (node && hasNextPage) {
				const observeCallback: IntersectionObserverCallback = ([entry]) => {
					// getNextPageParam
					entry.isIntersecting && fetchNextPage();
				};
				observer.current = new IntersectionObserver(observeCallback);
				observer.current.observe(node);
			}
		},
		[hasNextPage, fetchNextPage]
	);

	return (
		<CardLayout>
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
		</CardLayout>
	);
}
