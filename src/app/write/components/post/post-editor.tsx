'use client';

import {
	startTransition,
	useActionState,
	useEffect,
	useState,
	useCallback,
	FormEvent
} from 'react';
import { validatePost } from '@/utils';
import { FiArrowLeft } from 'react-icons/fi';
import { savePost } from '@/actions/actions';
import { redirect } from 'next/navigation';
import { GoAlert } from 'react-icons/go';
import { usePost } from '@/hooks/post';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import PostSetting from './post-setting';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

const Modal = dynamic(() => import('@/components/modal'), { ssr: false });
const TagEditor = dynamic(() => import('@/components/tag/tag-editor'), {
	ssr: false
});
const Editor = dynamic(() => import('@/components/editor/editor'), {
	ssr: false
});

export default function PostEditor({ blog }: any) {
	const {
		title,
		content,
		visibility,
		tags,
		path,
		summary,
		file,
		setTitle,
		setContent,
		setTags
	} = usePost();
	const [state, formAction] = useActionState(savePost, { status: '' });
	const [isModalOpen, setModalOpen] = useState(false);

	useEffect(() => {
		if (state?.status === 'ok') {
			redirect('/');
		} else if (state?.status && state.status !== '') {
			toast.error(state.status, {
				position: 'top-right',
				duration: 3000,
			});
		}
	}, [state]);

	const handleSubmit = useCallback(
		(ev: FormEvent<HTMLFormElement>) => {
			ev.preventDefault();
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
			formData.set('visibility', String(visibility));
			formData.set('file', file ?? '');
			formData.set('path', postPath);
			formData.set('summary', summary ?? '');
			formData.set('tags', JSON.stringify(tags));

			startTransition(() => {
				formAction(formData);
			});

			setModalOpen(false);
		},
		[title, content, file, visibility, summary, tags, path, formAction]
	);

	return (
		<>
			{/* 팝업 (로직 유지) */}
			<Modal
				open={isModalOpen}
				onAfterClose={() => setModalOpen(false)}
				className="w-full md:min-w-[700px] md:w-[50%]"
			>
				<form onSubmit={handleSubmit}>
					<PostSetting {...blog} />
				</form>
			</Modal>

			{/* 메인 에디터 영역 */}
			<main className="min-h-screen bg-background pb-32">
				<div className="max-w-4xl mx-auto px-6 pt-12 md:pt-20">
					{/* 제목 입력 */}
					<input
						className="w-full text-4xl md:text-5xl font-extrabold text-foreground placeholder:text-muted-foreground border-none outline-none bg-transparent leading-tight"
						placeholder="제목을 입력하세요"
						id="title"
						value={title}
						onChange={ev => setTitle(ev.target.value)}
						autoComplete="off"
					/>

					<Separator className="w-16 h-1.5 bg-foreground my-6 md:my-8" />

					{/* 태그 영역 (기존 TagEditor 감싸기) */}
					<div className="mb-8">
						<TagEditor tags={tags} onChange={setTags} />
					</div>

					{/* 본문 에디터 영역 */}
					<div className="min-h-[500px]">
						<Editor setContent={setContent} content={content} />
					</div>
				</div>
			</main>

			{/* 하단 고정 액션바 (Footer) */}
			<footer className="fixed bottom-0 left-0 w-full h-16 bg-background/95 backdrop-blur border-t border-border flex items-center justify-between px-6 md:px-12 z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.03)]">
				{/* 왼쪽: 뒤로가기 */}
				<Link
					href="/public"
					className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 transition-colors"
				>
					<FiArrowLeft size={20} />
					<span className="text-base font-medium">나가기</span>
				</Link>

				{/* 오른쪽: 버튼 그룹 */}
				<div className="flex gap-3">
					<Button
						id="temp_save"
						type="button"
						variant="ghost"
						className="text-neutral-600 font-bold hover:bg-neutral-100"
					>
						임시저장
					</Button>
					<Button
						type="button"
						onClick={() => setModalOpen(true)}
						className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6"
					>
						다음
					</Button>
				</div>
			</footer>
		</>
	);
}
