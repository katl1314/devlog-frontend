'use client';
import { Label } from '@/components/ui/label';
import { getTimeDiff } from '@/utils/time';
import Dayjs from 'dayjs';
import { AiFillLike } from 'react-icons/ai';
import { useEffect, useState } from 'react';

interface PostMeta {
	date: string;
	like: number;
	comments: number;
}

export default function PostMeta({ date, like, comments }: PostMeta) {
	const [dateFormat, setDateFormat] = useState<string>();

	useEffect(() => {
		const created_dt = Dayjs(date);
		setDateFormat(getTimeDiff(created_dt));
	}, [date]);

	return (
		<div className="flex flex-row gap-3 py-3 text-neutral-500">
			<Label>{dateFormat}</Label>
			<Label>{comments}개의 댓글</Label>
			<div className="flex gap-1">
				<AiFillLike />
				<Label>{like}</Label>
			</div>
		</div>
	);
}
