'use client';

import { createContext, PropsWithChildren, useState } from 'react';

interface PostContext {
	likeCount: number;
	isLiked: boolean;
	toggleLike: () => Promise<void>;
	saveComment: () => Promise<void>;
	commentCount: number;
}

export const PostContext = createContext<PostContext>({
	likeCount: 0,
	isLiked: false,
	toggleLike: async () => {},
	saveComment: async () => {},
	commentCount: 0
})

type IPostContextProviderProps = PropsWithChildren & {
	initIsLiked: boolean; // 좋아요 선택 여부
	initLikeCount: number; // 좋아요 개수
	initCommentCount: number; // 댓글 개수
	postId: number; // 포스트 ID
}

export default function PostContextProvider({
	children,
	postId,
	initIsLiked,
	initLikeCount,
	initCommentCount
}: IPostContextProviderProps) {
	const [isLiked, setIsLiked] = useState(initIsLiked || false);
	const [likeCount, setLikeCount] = useState(initLikeCount || 0);
	const [commentCount, setCommentCount] = useState(initCommentCount || 0);

	// 좋아요 토글 핸들러
	const toggleLike = async () => {
		// 변수에 기존 값을 저장한다.
		const prevIsLiked = isLiked;
		try {
			setIsLiked(!isLiked);
			setLikeCount((prev) => isLiked ? prev - 1 : prev + 1);

			console.log(postId);
			// await postService.like(postId, isLiked);
		} catch {
			// API 실패 시 기존값을 덮을 것.
			setIsLiked(prevIsLiked)
			setLikeCount(likeCount);
		}
	}

	// 댓글 작성
	const saveComment = async () => {
		const prevCommentCount = commentCount; // 이전 값 저장하고.

		try {
			setCommentCount(prev => prev + 1);
		} catch {
			// 에러가 발생하면 이전값으로 다시 돌린다.
			setCommentCount(prevCommentCount);
		}
	}

	return <PostContext.Provider value={{ isLiked, likeCount, toggleLike, commentCount, saveComment }}>
		{children}
	</PostContext.Provider>
}