'use client';
import { Label } from '@/components/ui/label';
import { AiFillLike } from 'react-icons/ai';
import { getTimeDiff } from '@/utils/time';
import Dayjs from 'dayjs';

interface PostMeta {
	date: string;
	comments: number;
}

export default function PostMeta({ date, comments }: PostMeta) {
	const created_dt = Dayjs(date);
	return (
		<div className="flex flex-row gap-3 py-3 text-neutral-500">
			<Label>{getTimeDiff(created_dt)}</Label>.<Label>{comments}개의 댓글</Label>.
			<Label className="gap-1">
				<AiFillLike />
				<span>0</span>
			</Label>
		</div>
	);
}
