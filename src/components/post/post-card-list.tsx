'use client';

import { createContext, useContext, RefCallback } from 'react';
import { QueryFunction } from '@tanstack/react-query';
import PostCard from '@/components/post/post-card';
import CardLayout from '@/components/layout/card-layout';
import useFetch, { FetchPostsResponse } from '@/hooks/fetch';

interface PostCardListContextValue {
	posts: any[];
	isEmpty: boolean;
	lastPostRef: RefCallback<HTMLDivElement>;
}

const PostCardListContext = createContext<PostCardListContextValue | null>(null);

export const usePostCardList = () => {
	const ctx = useContext(PostCardListContext);
	if (!ctx) {
		throw new Error('usePostCardList must be used within <PostCardList>');
	}
	return ctx;
};

interface PostCardListProps {
	queryKey: string[];
	queryFn: QueryFunction<FetchPostsResponse, readonly unknown[], unknown>;
	children: React.ReactNode;
}

function PostCardList({ queryKey, queryFn, children }: PostCardListProps) {
	const { data, lastPostRef } = useFetch({
		initialPageParam: 0,
		queryKey,
		queryFn,
		getNextPageParam: lastPage => lastPage.nextCursor ?? undefined
	});

	const posts = data.pages.flatMap(page => page.posts);
	const isEmpty = posts.length === 0;

	return (
		<PostCardListContext.Provider value={{ posts, isEmpty, lastPostRef }}>
			<CardLayout>{children}</CardLayout>
		</PostCardListContext.Provider>
	);
}

function Item() {
	const { posts, isEmpty, lastPostRef } = usePostCardList();
	if (isEmpty) return null;

	return (
		<>
			{posts.map((post, index) => {
				const isLast = index === posts.length - 1;
				return (
					<div key={post.id} ref={isLast ? lastPostRef : null}>
						<PostCard {...post} />
					</div>
				);
			})}
		</>
	);
}

function Empty({ children }: { children: React.ReactNode }) {
	const { isEmpty } = usePostCardList();
	if (!isEmpty) return null;
	return <>{children}</>;
}

PostCardList.Item = Item;
PostCardList.Empty = Empty;

export default PostCardList;
