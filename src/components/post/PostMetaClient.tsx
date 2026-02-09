'use client';

import { getTimeDiff } from '@/utils';
import Dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Label } from '../ui/label';

interface IPostMetaClient {
	date: string;
	fallback: string;
	className?: string;
}

export default function PostMetaClient({ date, fallback, className }: IPostMetaClient) {
	const [relative, setRelative] = useState<string | null>(null);

	useEffect(() => {
		const dt = Dayjs(date);
		setRelative(getTimeDiff(dt));
	}, [date]);

	return <Label className={className}>{relative ?? fallback}</Label>;
}
