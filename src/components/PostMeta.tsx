'use client';
import { Label } from '@/components/ui/label';
import { getTimeDiff } from '@/utils/time';
import Dayjs from 'dayjs';
import { useEffect, useState } from 'react';

interface PostMeta {
	date: string;
}

export default function PostMeta({ date }: PostMeta) {
	const [dateFormat, setDateFormat] = useState<string>();

	useEffect(() => {
		const created_dt = Dayjs(date);
		setDateFormat(getTimeDiff(created_dt));
	}, [date]);

	return (
		<>
			<Label>{dateFormat}</Label>
		</>
	);
}
