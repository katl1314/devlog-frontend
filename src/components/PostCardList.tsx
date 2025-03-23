"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useRef } from "react";
import PostCard from "@/components/PostCard";

import { FetchPostsResponse, ICard, fetchPostsFnc } from "@/types/type";
import { sleep } from "@/lib/utils";

// 데이터를 fetch하는 함수
const fetchPosts: fetchPostsFnc = async ({ tab, pageParam = 0 }) => {
  const res = await fetch(
    `http://192.168.0.12:3001/${tab}?_start=${pageParam}&_limit=10`
  );

  // 에러를 응답하는 경우
  if (!res.ok) throw new Error();
  const data: ICard[] = await res.json();

  await sleep(2000);

  return { posts: data, hasMore: data.length > 0 };
};

export default function PostCardList({ tab }: { tab: string }) {
  const { data, fetchNextPage, hasNextPage } =
    useSuspenseInfiniteQuery<FetchPostsResponse>({
      queryKey: ["posts", tab],
      queryFn: ({ pageParam = 0 }) =>
        fetchPosts({ tab, pageParam: pageParam as number }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) =>
        lastPage.hasMore ? allPages.length * 10 : undefined,
    });

  const observer = useRef<IntersectionObserver | null>(null);

  const lastPostRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();

      if (node && hasNextPage) {
        observer.current = new IntersectionObserver(
          ([entry]) => {
            // observer에 정의한 target이 감지되었으면? 다음 데이터를 가져온다.
            if (entry.isIntersecting) {
              fetchNextPage();
            }
          },
          { threshold: 1.0 }
        );
        observer.current.observe(node);
      }
    },
    [hasNextPage]
  );

  if (!data?.pages) return;

  return (
    <>
      {data.pages.map((page) =>
        page.posts.map((post, index) => {
          const isLastItem = index === page.posts.length - 1;
          return (
            <div key={post.id} ref={isLastItem ? lastPostRef : null}>
              {<PostCard {...post} />}
            </div>
          );
        })
      )}
    </>
  );
}
