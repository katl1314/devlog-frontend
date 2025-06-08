import { createClientByServer } from '@/utils/supabase/server';
import Image from 'next/image';
import Link from 'next/link';
import { Comments as TComments } from '@/types/type';
import CommentFooter from './CommentFooter';

export async function CommentItem(comment: TComments) {
	const supabase = await createClientByServer();
	const { comments, userId, id } = comment;
	const profile = await supabase.from('profiles').select('avatar_url').eq('userId', userId).single();
	if (profile.error) throw new Error('사용자 정보를 불러오는 중 에러가 발생함.');

	const childComments = await supabase.from('comments').select().eq('pid', id);

	return (
		<div className="mt-6">
			<CommentHeader {...comment} avatar_url={profile.data?.avatar_url} />
			<CommentBody comments={comments} />
			<CommentFooter {...comment} data={childComments.data as TComments[]} />
		</div>
	);
}

export function CommentHeader({ userId, avatar_url, created_at }: TComments & { avatar_url: string }) {
	return (
		<div className="flex flex-row items-center justify-between mb-6">
			<div className="flex flex-row gap-3 items-center">
				<div className="relative w-[60px] h-[60px]">
					<Link href={`/@${userId}`}>
						<Image src={avatar_url} alt="이미지" fill className="rounded-[50%]"></Image>
					</Link>
				</div>
				<div>
					<div className="font-bold">{userId}</div>
					<div>{created_at}</div>
				</div>
			</div>
			<div className="flex flex-row items-center gap-2">
				<div>수정</div>
				<div>삭제</div>
			</div>
		</div>
	);
}

export function CommentBody({ comments }: { comments: string }) {
	return <div className="my-[18px]">{comments}</div>;
}
