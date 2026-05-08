'use client';

import { createContext, useContext, RefCallback } from 'react';
import { QueryFunction } from '@tanstack/react-query';
import CardLayout from '@/components/layout/card-layout';
import useFetch, { FetchPostsResponse } from '@/hooks/fetch';

interface InfiniteListContextValue {
	items: any[];
	isEmpty: boolean;
	lastItemRef: RefCallback<HTMLDivElement>;
}

const InfiniteListContext = createContext<InfiniteListContextValue | null>(null);

const useInfiniteList = () => {
	const ctx = useContext(InfiniteListContext);
	if (!ctx) throw new Error('useInfiniteList must be used within <InfiniteList>');
	return ctx;
};

interface InfiniteListProps {
	queryKey: string[];
	queryFn: QueryFunction<FetchPostsResponse, readonly unknown[], unknown>;
	children: React.ReactNode;
}

function InfiniteList({ queryKey, queryFn, children }: InfiniteListProps) {
	const { data, lastPostRef } = useFetch({
		initialPageParam: 0,
		queryKey,
		queryFn,
		getNextPageParam: lastPage => lastPage.nextCursor ?? undefined
	});

	const items = data.pages.flatMap(page => page.posts);
	const isEmpty = items.length === 0;

	return (
		<InfiniteListContext.Provider value={{ items, isEmpty, lastItemRef: lastPostRef }}>
			<CardLayout>{children}</CardLayout>
		</InfiniteListContext.Provider>
	);
}

interface ItemProps {
	render: (item: any) => React.ReactNode;
}

function Item({ render }: ItemProps) {
	const { items, isEmpty, lastItemRef } = useInfiniteList();
	if (isEmpty) return null;

	return (
		<>
			{items.map((item, index) => {
				const isLast = index === items.length - 1;
				return (
					<div key={item.id} ref={isLast ? lastItemRef : null}>
						{render(item)}
					</div>
				);
			})}
		</>
	);
}

function Empty({ children }: { children: React.ReactNode }) {
	const { isEmpty } = useInfiniteList();
	if (!isEmpty) return null;
	return <>{children}</>;
}

InfiniteList.Item = Item;
InfiniteList.Empty = Empty;

export default InfiniteList;
