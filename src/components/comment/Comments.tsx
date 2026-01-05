'use client';

import { Button } from '../ui/button';
import { FormEvent } from 'react';

interface ICommentsProps {
	path: string;
	pid?: number | undefined | null;
	level?: number | undefined | null;
	onSuccess?: () => void;
}

export default function Comments({ path, pid, level, onSuccess }: ICommentsProps) {

	function handleSubmit(ev: FormEvent) {
		ev.preventDefault();
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>

			</form>
		</div>
	);
}
