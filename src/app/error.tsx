'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

type IError = {
	error: Error & { digest?: string };
	reset: () => void;
};

export default function Error({ error, reset }: IError) {
	useEffect(() => {
		console.error(error);
	}, [error]);
	return (
		<div>
			<h2>Something went wrong!</h2>
			<Button onClick={() => reset()}>Try Again</Button>
		</div>
	);
}
