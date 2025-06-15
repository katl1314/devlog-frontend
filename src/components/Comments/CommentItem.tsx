'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Comments as TComments } from '@/types/type';
import CommentFooter from './CommentFooter';
import { Separator } from '../ui/separator';
import { useContext, useEffect, useState } from 'react';
import { createClientByBrowser } from '@/utils/supabase/client';
import PostMeta from '@/components/Post/PostMeta';
import { useProfile } from '@/store/profile';
import { deleteComments } from '@/actions/actions';
import { ConfirmDialog } from '../Dialog/CustomDialog';
import { PostContext } from '@/app/(user)/post/[...slug]/components/PostContextProvider';

// 일단 대댓글은 2depth까지 보여준다.
export default function CommentItem(comment: TComments) {
	const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
	const profile = useProfile();
	const post = useContext(PostContext); // post작성 사용자

	useEffect(() => {
		const supabase = createClientByBrowser();
		supabase
			.from('profiles')
			.select('avatar_url')
			.eq('userId', comment.userId)
			.single()
			.then(({ data }) => {
				setAvatarUrl(data?.avatar_url);
			});
	}, [comment.userId]);

	const isEdit = profile.userId === comment.userId;
	const isDelete = !!post.userId || isEdit;

	return (
		<div className="mt-6">
			<CommentHeader {...comment} avatar_url={avatarUrl} isDelete={isDelete} isEdit={isEdit} />
			<div className="my-6">{comment.comments}</div>
			{(comment.level ?? 0) < 2 && <CommentFooter {...comment} />}
			<Separator />
		</div>
	);
}

type ICommentHeader = TComments & { avatar_url?: string | null | undefined; isEdit: boolean; isDelete: boolean };

export function CommentHeader({ userId, avatar_url, created_at, isEdit, isDelete, id }: ICommentHeader) {
	const handleDeletComment = () => {
		deleteComments(id);
	};

	return (
		<div className="flex flex-row justify-between mb-6">
			<div className="flex flex-row gap-3 items-center">
				<div className="relative w-[60px] h-[60px]">
					{avatar_url && (
						<Link href={`/@${userId}`}>
							<Image src={avatar_url} alt="이미지" fill className="rounded-[50%]"></Image>
						</Link>
					)}
				</div>
				<div>
					<div className="font-bold">{userId}</div>
					<PostMeta date={created_at} />
				</div>
			</div>
			<div className="text-sm text-neutral-500">
				{isEdit && <span className="cursor-pointer">수정</span>}
				{isDelete && (
					<ConfirmDialog
						title="댓글 삭제"
						description="댓글을 정말로 삭제하시겠습니까?"
						afterConfirm={handleDeletComment}
					>
						<span className="cursor-pointer ml-2">삭제</span>
					</ConfirmDialog>
				)}
			</div>
		</div>
	);
}
