'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Comments as TComments } from '@/types/type';
import CommentFooter from './CommentFooter';
import { Separator } from '../ui/separator';
import { useEffect, useState } from 'react';
import { createClientByBrowser } from '@/utils/supabase/client';
import PostMeta from '@/components/Post/PostMeta';

// 일단 대댓글은 2depth까지 보여준다.
export default function CommentItem(comment: TComments) {
	const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
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

	return (
		<div className="mt-6">
			<CommentHeader {...comment} avatar_url={avatarUrl} />
			<div className="my-[18px]">{comment.comments}</div>
			{ (comment.level ?? 0) < 1 && <CommentFooter {...comment} /> }
			<Separator />
		</div>
	);
}

export function CommentHeader({
	userId,
	avatar_url,
	created_at
}: TComments & { avatar_url?: string | null | undefined }) {
	return (
		<div className="flex flex-row items-center justify-between mb-6">
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
			<div className="flex flex-row items-center gap-2">
				<div>수정</div>
				<div>삭제</div>
			</div>
		</div>
	);
}
