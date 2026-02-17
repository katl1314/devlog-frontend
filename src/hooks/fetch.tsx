'use client';

import { GetNextPageParamFunction, useSuspenseInfiniteQuery, QueryFunction } from '@tanstack/react-query';
import { FetchPostsResponse } from '@/types/type';
import { useCallback, useRef, PropsWithChildren } from 'react';

type IPagingComponent = {
  queryKey: string[] | string, // 쿼리의 고유 키, 캐싱/리패칭 기준 일반적으로 배열 (어떤 게시물의 쿼리인가)
  initialPageParam: number, // 페이징 초기값
  queryFn: QueryFunction<FetchPostsResponse, readonly unknown[], unknown>, // 데이터 패칭 함수
  getNextPageParam: GetNextPageParamFunction<unknown, FetchPostsResponse>; // 다음 페이지 정보 반환하는 함수
} & PropsWithChildren;


export default function useFetch({ queryKey, initialPageParam,  queryFn, getNextPageParam}: IPagingComponent) {
  const { data, fetchNextPage, hasNextPage } =
    useSuspenseInfiniteQuery<FetchPostsResponse>({
      queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
      initialPageParam,
      getNextPageParam,
      queryFn,
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

  return {
    lastPostRef,
    data,
  }
}