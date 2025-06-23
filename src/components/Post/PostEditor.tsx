'use client';

import { Button } from '../ui/button';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import { Label } from '../ui/label';
import dynamic from 'next/dynamic';
import { Input } from '../ui/input';
import { FormEventHandler, startTransition, useActionState, useEffect, useState } from 'react';
import { savePost } from '@/actions/actions';
import { validatePost } from '@/utils/validation';
import { toast } from 'sonner';
import { GoAlert } from 'react-icons/go';
import { usePost } from '@/store/post';
import { useProfile } from '@/store/profile';
import { redirect } from 'next/navigation';
import PostSetting from './PostSetting';

const Editor = dynamic(() => import('../editor/Editor'));
const CustomModal = dynamic(() => import('@/components/modal/CustomModal'), { ssr: false }); // 지연 로딩
const TagEditor = dynamic(() => import('../editor/TagEditor'));

export default function PostEditor() {
	// 모바일인지 아닌지 확인은 해상도를 통해서...
	const [state, formAction] = useActionState(savePost, { message: '', status: '' });
	const [isModalOpen, setModalOpen] = useState(false);
	const { title, content, visibility, tags, path, summary, file, setTitle, setContent, setTags, setReset } = usePost();
	const { userId } = useProfile();

	useEffect(() => {
		const { status, message } = state;
		if (status == 'ERROR') {
			toast(message, {
				position: 'top-right',
				duration: 2000,
				icon: <GoAlert />
			});
			return;
		}

		if (status === 'OK') {
			setReset();
			redirect('/'); // 생성된 페이지로 리다이렉트가 되어야한다.
		}
	}, [state, setReset]);

	const handleSubmit: FormEventHandler<HTMLFormElement> = function (ev) {
		const error = validatePost({ title, content });
		if (error) {
			ev.preventDefault(); // 이벤트 기본 동작 방지
			toast(error, {
				position: 'top-right',
				duration: 1500,
				icon: <GoAlert />
			});
			return;
		}

		const postPath = path ? `/@${userId}/${path}` : `/@${userId}/${title}`;

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
	};

	return (
		<div className="flex flex-col justify-between">
			<div className="flex flex-col mt-10 gap-2 flex-1">
				<Input
					className="h-[50px] font-bold text-3xl border-0 shadow-none"
					placeholder="제목을 입력하세요."
					id="title"
					value={title}
					onChange={ev => setTitle(ev.target.value)}
				/>
				<TagEditor tags={tags} onChange={setTags} />
				<Editor name="content" setContent={setContent} defaultValue={content} />
			</div>
			<div className="w-full flex justify-between items-center">
				<div className="flex gap-4">
					<Link href="/" className="flex items-center p-2 gap-2 group hover:bg-black transition-colors duration-300">
						<FiArrowLeft size={28} className="group-hover:stroke-[white] cursor-pointer" />
						<Label className="group-hover:text-white lg:text-lg font-bold cursor-pointer">이전</Label>
					</Link>
				</div>
				<div className="flex gap-4">
					<Button type="button" className="rounded-0 cursor-pointer" variant="outline">
						미리 저장
					</Button>
					<Button type="button" className="rounded-0 cursor-pointer" onClick={() => setModalOpen(true)}>
						다음
					</Button>
				</div>
			</div>
			{isModalOpen && (
				<CustomModal
					afterCloseModal={() => setModalOpen(open => !open)}
					className="w-full mt-[5%] md:min-w-[500px] md:w-[25%]"
				>
					<form onSubmit={handleSubmit}>
						<PostSetting />
					</form>
				</CustomModal>
			)}
		</div>
	);
}
