'use client';
import { Button } from './ui/button';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import { Label } from './ui/label';
import dynamic from 'next/dynamic';
import { Input } from './ui/input';
import { FormEventHandler, useActionState, useState } from 'react';
import { writePost } from '@/actions/actions';
import { validatePost } from '@/utils/validation';
import { toast } from 'sonner';
import { GoAlert } from 'react-icons/go';
import PostSetting from './PostSetting';

const Editor = dynamic(() => import('./Editor'));
const CustomModal = dynamic(() => import('@/components/Modal/CustomModal'), { ssr: false }); // 지연 로딩
const TagEditor = dynamic(() => import('./TagEditor'));

export default function PostEditor() {
	// 모바일인지 아닌지 확인은 해상도를 통해서...
	const [tags, setTags] = useState<string[]>([]);
	const [, formAction, isPending] = useActionState(writePost, null);

	const [open, setOpen] = useState(false);

	const handleAfterCloseModal = () => {
		setOpen(prevState => !prevState);
	};

	const handleSubmit: FormEventHandler<HTMLFormElement> = function (ev) {
		const formData = new FormData(ev.currentTarget);
		const title = formData.get('title')?.toString();
		const content = formData.get('content')?.toString();
		const error = validatePost({ title, content });

		if (error) {
			ev.preventDefault(); // 이벤트 기본 동작 방지
			toast(error, {
				position: 'top-right',
				duration: 3000,
				icon: <GoAlert />
			});
		}
	};

	return (
		<div className="flex flex-col mt-4 justify-between">
			<form action={formAction} onSubmit={handleSubmit}>
				<div className="flex flex-col gap-4 flex-1">
					<Input
						type="text"
						className="h-[50px] font-bold text-3xl border-0 shadow-none"
						placeholder="제목을 입력하세요."
						id="title"
						name="title"
					/>
					<TagEditor tags={tags} onChange={setTags} />
					<Editor name="content" />
				</div>
				<div className="w-full flex justify-between items-center mt-4">
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
						<Button type="button" className="rounded-0 cursor-pointer" onClick={() => setOpen(true)}>
							다음
						</Button>
					</div>
				</div>
				<input type="hidden" name="tags" value={JSON.stringify(tags)} />
				{open && (
					<CustomModal afterCloseModal={handleAfterCloseModal} className="w-full mt-[5%] md:min-w-[500px] md:w-[25%]">
						<PostSetting />
					</CustomModal>
				)}
			</form>
		</div>
	);
}
