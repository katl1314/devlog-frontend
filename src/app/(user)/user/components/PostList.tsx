'use client';

import { QueryFunction, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useRef } from 'react';
import { fetchPostsFncByUser, FetchPostsResponseUser } from '@/types/type';
import EmptyContent from '@/components/EmptyContent';
import PostCard from './PostCard';

// 데이터를 fetch하는 함수
const fetchPosts: fetchPostsFncByUser = async ({ userId, pageParam = 0 }) => {
	const posts = await fetch(
		`${process.env.NEXT_PUBLIC_SITE_URL}/api/user/posts?userId=${userId}&pageParam=${pageParam}`
	);

	if (!posts.ok) {
		throw new Error('데이터를 불러오는데 실패했습니다.');
	}

	const { data } = await posts.json();

	return { posts: data, hasMore: data.length > 0 };
};

export default function PostList({ userId }: { userId: string }) {
	const queryFn: QueryFunction<FetchPostsResponseUser, readonly unknown[], unknown> = ({ pageParam = 0 }) =>
		fetchPosts({ userId, pageParam: pageParam as number });

	const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery<FetchPostsResponseUser>({
		queryKey: ['posts', userId],
		queryFn,
		initialPageParam: 0,
		getNextPageParam: (lastPage, allPages) => (lastPage.hasMore ? allPages.length * 10 : undefined)
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

	if (data.pages[0].posts.length < 1) {
		// 만약 조회한 데이터가 없으면?
		return <EmptyContent message="게시물이 존재하지 않습니다." />;
	}

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
