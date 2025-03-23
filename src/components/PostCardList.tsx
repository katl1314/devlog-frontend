'use client';

import { QueryFunction, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useRef } from 'react';
import PostCard from '@/components/PostCard';
import { FetchPostsResponse, ICard, fetchPostsFnc } from '@/types/type';
import EmptyContent from './EmptyContent';
import CardLayout from './Layout/CardLayout';

// 데이터를 fetch하는 함수
const fetchPosts: fetchPostsFnc = async ({ tab, pageParam = 0 }) => {
	const res = await fetch(`http://192.168.0.12:3001/${tab}?_start=${pageParam}&_limit=10`);

	// 에러를 응답하는 경우
	if (!res.ok) throw new Error();
	const data: ICard[] = await res.json();

	return { posts: data, hasMore: data.length > 0 };
};

export default function PostCardList({ tab }: { tab: string }) {
	const queryFn: QueryFunction<FetchPostsResponse, readonly unknown[], unknown> = ({ pageParam = 0 }) =>
		fetchPosts({ tab, pageParam: pageParam as number });

	const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery<FetchPostsResponse>({
		queryKey: ['posts', tab],
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
		<CardLayout>
			{data.pages.map(({ posts }) =>
				posts.map((post, index) => {
					const isLastItem = index === posts.length - 1;
					return (
						<div key={post.id} ref={isLastItem ? lastPostRef : null}>
							{<PostCard {...post} />}
						</div>
					);
				})
			)}
		</CardLayout>
	);
}
