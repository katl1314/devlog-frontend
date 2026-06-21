'use client';

import { startTransition, useActionState, useEffect, useState, useCallback, SyntheticEvent } from 'react';
import { validatePost } from '@/utils';
import { FiArrowLeft } from 'react-icons/fi';
import { savePost } from '@/actions/actions';
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

interface PostEditorProps {
	user: { blog: { url_slug: string }; user_id: string };
	post?: {
		id: string;
		title: string;
		content: string;
		tags: { name: string }[];
		visibility: boolean;
		path: string;
		summary: string;
		thumbnail: string | null;
		series_id: string | null;
	};
}

export default function PostEditor({ user, post }: PostEditorProps) {
	const { blog, user_id } = user;
	const { title, content, tags, thumbnail, setTitle, setContent, setTags, initialize, reset, getFormData } = usePost();

	const handleImageUpload = async (file: File): Promise<string> => {
		const formData = new FormData();
		formData.set('image', file);
		const res = await fetch('/api/image', { method: 'POST', body: formData });
		if (!res.ok) {
			const body = (await res.json().catch(() => ({}))) as { message?: string };
			const message = body.message ?? '이미지 업로드에 실패했습니다.';
			toast.error(message, { position: 'top-right', duration: 3000 });
			throw new Error(message);
		}
		const data = (await res.json()) as { url: string };
		return data.url;
	};
	const [state, formAction] = useActionState(savePost, { status: '' });
	const [isModalOpen, setModalOpen] = useState(false);

	useEffect(() => {
		if (post) {
			initialize({
				title: post.title,
				content: post.content,
				tags: post.tags.map(t => t.name) ?? [],
				visibility: post.visibility,
				path: post.path.replace(/^\//, ''),
				summary: post.summary,
				seriesId: post.series_id
			});
		}
		return () => {
			reset();
		};
	}, [post, initialize, reset]);

	useEffect(() => {
		if (state?.status === 'ok') {
			window.location.href = state.callbackUrl ?? '/';
		} else if (state?.status && state.status !== '') {
			toast.error(state.status, {
				position: 'top-right',
				duration: 3000
			});
		}
	}, [state]);

	const handleSubmit = useCallback(
		(ev: SyntheticEvent<HTMLFormElement>) => {
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

			const formData = getFormData(post?.id);
			if (!thumbnail && post?.thumbnail) {
				formData.set('thumbnail', post.thumbnail);
			}
			startTransition(() => {
				formAction(formData);
			});

			setModalOpen(false);
		},
		[post, title, content, thumbnail, getFormData, formAction]
	);

	return (
		<>
			{/* 팝업 (로직 유지) */}
			<Modal open={isModalOpen} onAfterClose={() => setModalOpen(false)} className="w-full md:min-w-175 md:w-[50%]">
				<form onSubmit={handleSubmit}>
					<PostSetting url_slug={blog.url_slug} userId={user_id} thumbnailUrl={post?.thumbnail ?? undefined} />
				</form>
			</Modal>

			{/* 메인 에디터 영역 */}
			<main className="min-h-screen bg-background pb-32">
				<div className="max-w-4xl mx-auto md:px-6 pt-10 md:pt-20">
					{/* 제목 입력 */}
					<input
						className="w-full text-3xl md:text-5xl font-extrabold text-foreground placeholder:text-muted-foreground border-none outline-none bg-transparent leading-tight"
						placeholder="제목을 입력하세요"
						id="title"
						name="title"
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
					<div className="min-h-125">
						<Editor setContent={setContent} content={content} name="content" onImageUpload={handleImageUpload} />
					</div>
				</div>
			</main>

			{/* 하단 고정 액션바 (Footer) */}
			<footer className="fixed bottom-0 left-0 w-full h-16 bg-background/95 backdrop-blur border-t border-border flex items-center justify-between px-6 md:px-12 z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.03)]">
				<Link href="/" className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 transition-colors">
					<FiArrowLeft size={20} />
					<span className="text-base font-medium">나가기</span>
				</Link>

				{/* 오른쪽: 버튼 그룹 */}
				<div className="flex gap-3">
					<Button
						id="temp_save"
						type="button"
						variant="ghost"
						className="text-muted-foreground font-bold hover:bg-muted hover:text-foreground"
					>
						임시저장
					</Button>
					<Button
						type="button"
						onClick={() => setModalOpen(true)}
						className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 transition-all duration-200 active:scale-95"
					>
						다음
					</Button>
				</div>
			</footer>
		</>
	);
}
