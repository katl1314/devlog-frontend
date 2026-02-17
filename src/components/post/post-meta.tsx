'use client';

import { getTimeDiff, getTimeFormat } from '@/utils';
import { useEffect, useState } from 'react';
import { Label } from '../ui/label';

interface IPostMetaClient {
	date: string;
	className?: string;
}

export default function PostMeta({ date, className }: IPostMetaClient) {
	const [relative, setRelative] = useState<string | null>(getTimeFormat(date, 'YYYY-MM-DD'));

	useEffect(() => {
		setRelative(getTimeDiff(date));
	}, [date]);

	return <Label className={className}>{relative}</Label>;
}
