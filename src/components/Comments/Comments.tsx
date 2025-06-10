'use client';

import { ChangeEventHandler, startTransition, useActionState, useState } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { saveComments } from '@/actions/actions';

export default function Comments({ path, pid, level }: { path: string; pid?: number | undefined | null, level?: number | undefined | null }) {
	const [comments, setComments] = useState('');
	const [_, formAction, isPending] = useActionState(saveComments, { message: '', status: '' });


	function handleSubmit() {
		const formData = new FormData();
		formData.set('path', path);
		formData.set('comments', comments);
		formData.set('pid', `${pid ?? ''}`); // 부모 댓글의 id를 의미한다.
		formData.set('level', `${(level ?? -1) + 1}`);

		startTransition(() => {
			formAction(formData);
		});
	}

	const handleChange: ChangeEventHandler<HTMLTextAreaElement> = ev => {
		const target = ev.target;
		setComments(target.value);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<Textarea className="h-[72px] py-4" placeholder="댓글을 입력하세요." value={comments} onChange={handleChange} />
				<div className="flex flex-row justify-end my-6">
					<Button type="submit" disabled={isPending}>
						댓글 작성
					</Button>
				</div>
			</form>
		</div>
	);
}
