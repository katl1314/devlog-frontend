'use client';

import { startTransition, useActionState, useEffect, useState, useCallback, FormEvent } from 'react';
import { validatePost } from '@/utils/validation';
import { FiArrowLeft } from 'react-icons/fi';
import { savePost } from '@/actions/actions';
import { redirect } from 'next/navigation';
import { GoAlert } from 'react-icons/go';
import { usePost } from '@/hooks/post';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { toast } from 'sonner';
import PostSetting from '../Post/PostSetting';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const Modal = dynamic(() => import('@/components/modal/modal'), { ssr: false });
const TagEditor = dynamic(() => import('../editor/TagEditor'), { ssr: false });
const Editor = dynamic(() => import('../editor/Editor'), { ssr: false });

export default function PostEditor({ blog }: any) {
	const { title, content, visibility, tags, path, summary, file, setTitle, setContent, setTags } = usePost();
	const [state, formAction] = useActionState(savePost, { message: '', status: '' });
	const [isModalOpen, setModalOpen] = useState(false);

	useEffect(() => {
		const { status, message } = state!;
		if (status == 'ERROR') {
			toast(message, {
				position: 'top-right',
				duration: 2000,
				icon: <GoAlert />
			});
			return;
		}

		if (status === 'OK') {
			redirect('/'); 	// 생성된 페이지로 리다이렉트가 되어야한다.
		}
	}, [state]);

	const handleSubmit = useCallback((ev: FormEvent<HTMLFormElement>) => {
		ev.preventDefault(); // 이벤트 기본 동작 방지
		const error = validatePost({ title, content });

		if (error) {
			toast(error, {
				position: 'top-right',
				duration: 1500,
				icon: <GoAlert />
			});
			return;
		}

		const postPath = path ? `/${path}` : `/${title}`;
		const formData = new FormData();

		formData.set('title', title);
		formData.set('content', content);
		formData.set('visibility', visibility);
		formData.set('file', file ?? '');
		formData.set('path', postPath);
		formData.set('summary', summary ?? '');
		formData.set('tags', JSON.stringify(tags));

		startTransition(() => {
			formAction(formData);
		});

		setModalOpen(false);
	}, [title, content, file, visibility, summary, tags, path]);

	return (
		<>
			<Modal
				open={isModalOpen}
				onAfterClose={() => setModalOpen(false)}
				className="mt-[5%] w-full md:min-w-[500px] md:w-[25%]"
			>
				<form onSubmit={handleSubmit}>
					<PostSetting {...blog}/>
				</form>
			</Modal>
			<div className="flex flex-col justify-between h-[80vh]">
				<div className="flex flex-col mt-5 lg:mt-10 gap-4 flex-1">
					<input
						className="title"
						placeholder="제목을 입력하세요."
						id="title"
						value={title}
						onChange={ev => setTitle(ev.target.value)}
					/>
					<TagEditor tags={tags} onChange={setTags} />
					<Editor setContent={setContent} content={content} />
				</div>
			</div>
			<div className="w-full flex justify-between items-center">
				<div className="flex gap-4">
					<Link
						href="/"
						className="flex items-center p-2 gap-2 group hover:bg-neutral-500 transition-colors duration-100"
					>
						<FiArrowLeft size={28} className="group-hover:stroke-[white] cursor-pointer" />
						<Label className="group-hover:text-white lg:text-lg font-bold cursor-pointer">이전</Label>
					</Link>
				</div>
				<div className="flex gap-4">
					<Button id="temp_save" type="button" variant="outline">
						임시저장
					</Button>
					<Button type="button" onClick={() => setModalOpen(true)}>
						다음
					</Button>
				</div>
			</div>
		</>
	);
}
