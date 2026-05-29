'use client';

import { createContext, PropsWithChildren, useState } from 'react';
import { postService } from '@/services/post.service';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

interface PostContext {
	postId?: number;
	likeCount: number;
	isLiked: boolean;
	toggleLike: () => Promise<void>;
	setCommentCount: (count: number) => void;
	commentCount: number;
	isModal: boolean;
	path: string;
	userId: string;
}

export const PostContext = createContext<PostContext>({
	likeCount: 0,
	isLiked: false,
	toggleLike: async () => {},
	setCommentCount: (count: number) => {},
	commentCount: 0,
	isModal: false,
	path: '',
	userId: ''
});

type IPostContextProviderProps = PropsWithChildren & {
	initIsLiked: boolean; // 좋아요 선택 여부
	initLikeCount: number; // 좋아요 개수
	initCommentCount: number; // 댓글 개수
	postId: number; // 포스트 ID
	isModal: boolean;
	path: string;
	userId: string;
};

export default function PostContextProvider({
	children,
	postId,
	isModal,
	initIsLiked,
	initLikeCount,
	initCommentCount,
	path,
	userId
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
				toast('로그인 후 이용 가능합니다,');
				return;
			}

			const accessToken = data?.accessToken;
			if (!accessToken) return;

			await postService.like(postId, !isLiked, accessToken);

			setIsLiked(!isLiked);
			setLikeCount(prev => (isLiked ? prev - 1 : prev + 1));
		};

		return (
			<PostContext.Provider
				value={{
					postId,
					userId,
					isLiked,
					isModal,
					likeCount,
					commentCount,
					toggleLike,
					setCommentCount,
					path
				}}
			>
				{children}
			</PostContext.Provider>
		);
	} catch (e: unknown) {
		// API 요청 중 에러가 발생하거나, 예외 처리가 발생했을때 처리합니다.
		const error = e as Error;
		console.log(error);
	}
}
