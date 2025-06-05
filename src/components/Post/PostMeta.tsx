'use client';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { getTimeDiff } from '@/utils/time';
import Dayjs from 'dayjs';
import { useEffect, useState } from 'react';

interface IPostMeta {
	date: string;
	className?: string;
}

export default function PostMeta({ date, className }: IPostMeta) {
	const [dateFormat, setDateFormat] = useState<string>();

	useEffect(() => {
		const created_dt = Dayjs(date);
		setDateFormat(getTimeDiff(created_dt));
	}, [date]);

	return <Label className={cn(className)}>{dateFormat}</Label>;
}
