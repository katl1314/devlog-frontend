'use client';

import PostCard from '@/components/Post/PostCard';
import CardLayout from '../layout/CardLayout';
import { QueryFunction, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useRef } from 'react';
import { FetchPostsResponse, fetchPostsFnc } from '@/types/type';

// 데이터를 fetch하는 함수
const fetchPosts: fetchPostsFnc = async ({ pageParam = 0 }) => {
	const action = `${process.env.NEXT_PUBLIC_SITE_URL}/api/posts?pageParam=${pageParam}`;
	const posts = await fetch(action);
	if (!posts.ok) {
		console.error('데이터를 불러오는데 실패했습니다.');
	}

	// const { data } = await posts.json();

	return { posts: [], hasMore: [].length > 0 };
};

export default function PostCardList({ tab }: { tab: string }) {
	const queryFn: QueryFunction<
		FetchPostsResponse,
		readonly unknown[],
		unknown
	> = ({ pageParam = 0 }) =>
		fetchPosts({ tab, pageParam: pageParam as number });

	const { data, fetchNextPage, hasNextPage } =
		useSuspenseInfiniteQuery<FetchPostsResponse>({
			queryKey: ['posts'], // 쿼리의 고유 키, 캐싱/리패칭 기준 일반적으로 배열 (어떤 게시물의 쿼리인가)
			queryFn, // 실제 데이터를 패치하는 함수 다음 페이지 fetch시 실행
			initialPageParam: 0, // 첫번째 페이지 파라미터 값 보통 0, 1 커서 기반인 경우 커서의 초기값
			getNextPageParam: (lastPage, allPages) =>
				lastPage.hasMore ? allPages.length * 10 : undefined // 다음 페이지 불러올때 다음 파라미터 계산하는 함수
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
