'use client';

import { ChangeEventHandler, FormEvent, startTransition, useActionState, useEffect, useState, useRef } from 'react';
import { saveComment } from '@/actions/actions';
import { useRouter } from 'next/navigation';
import { GoAlert } from 'react-icons/go';
import { Button } from '../ui/button';
import { toast } from 'sonner';

interface IComments {
	path: string;
	pid?: number | undefined | null;
	level?: number | undefined | null;
	onSuccess?: () => void;
}

export default function Comments({
		 path,
		 pid,
		 level,
		 onSuccess
}: IComments) {
	const [comments, setComments] = useState('');
	const [state, formAction, isPending] = useActionState(saveComment, { message: '', status: '' });
	const router = useRouter();
	const textRef = useRef<HTMLTextAreaElement | null>(null);

	useEffect(() => {
		const { status, message } = state;
		if (status === 'ERROR') {
			toast(message, {
				position: 'top-right',
				duration: 2000,
				icon: <GoAlert />
			});
			return;
		} else if (status === 'OK') {
			router.refresh(); // 서버 컴포넌트만 리렌더링
			onSuccess?.();
			setComments(''); // 댓글 입력 초기화
		}
	}, [state, router]);

	function handleSubmit(ev: FormEvent) {
		ev.preventDefault();
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

	const handleResizeHeight = () => {
		if (textRef.current) {
			textRef.current.style.height = 'auto';
			textRef.current.style.height = textRef.current.scrollHeight + 'px';
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<textarea
					className="p-4 w-full min-h-[100px] max-h-[300px] border-1"
					placeholder="댓글을 입력하세요."
					value={comments}
					rows={1}
					onChange={handleChange}
					onInput={handleResizeHeight}
					ref={textRef}
					required
				></textarea>
				<div className="flex flex-row justify-end my-6">
					<Button type="submit" disabled={isPending}>
						댓글 작성
					</Button>
				</div>
			</form>
		</div>
	);
}

