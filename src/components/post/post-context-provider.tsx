'use client';

import { createContext, PropsWithChildren, useState } from 'react';
import { postService } from '@/services/post.service';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';

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
	const { data, status } = useSession();

	const isAuth = status === 'authenticated';
	try {
		// 좋아요 토글 핸들러
		const toggleLike = async () => {
				// 비로그인 일 때
				if (!isAuth) {
					throw new Error();
				}

				const { accessToken } = data as Session & { accessToken: string };

				await postService.like(postId, isLiked, accessToken);

				setIsLiked(!isLiked);
				setLikeCount((prev) => isLiked ? prev - 1 : prev + 1);
		}

		// 댓글 작성
		const saveComment = async () => {
				// 비로그인 일 때
				if (!isAuth) {
					throw new Error('');
				}
				// await postService.comment();
				// setCommentCount(prev => prev + 1);
		}

		return (
			<PostContext.Provider value={{ isLiked, likeCount, toggleLike, commentCount, saveComment }}>
				{children}
			</PostContext.Provider>
		)
	} catch (e: unknown) {
		// API 요청 중 에러가 발생하거나, 예외 처리가 발생했을때 처리합니다.
		const error = e as Error;
		console.log(error);
	}

}