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

type PostType = 'public' | 'private';

interface FormData {
	title: string;
	content: string;
	tags?: string[];
	file?: File;
	postType: PostType;
}

export default function PostEditor() {
	// 모바일인지 아닌지 확인은 해상도를 통해서...
	const [tags, setTags] = useState<string[]>([]);
	const [, formAction] = useActionState(writePost, null);
	const [isModalOpen, setModalOpen] = useState(false);
	const [featuredImage, setFeaturedImage] = useState<string | null>(null);
	const [title, setTitle] = useState<string>('');
	const [content, setContent] = useState<string>('');
	const [visibility, setVisibility] = useState<PostType>('public');

	// Toggle modal
	const toggleModal = () => setModalOpen(open => !open);

	const handleSubmit: FormEventHandler<HTMLFormElement> = function (ev) {
		const error = validatePost({ title, content });
		console.log(visibility, featuredImage);
		console.log(title, content);
		console.log(tags);
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
			<div className="flex flex-col gap-4 flex-1">
				<Input
					type="text"
					className="h-[50px] font-bold text-3xl border-0 shadow-none"
					placeholder="제목을 입력하세요."
					id="title"
					value={title}
					onChange={ev => setTitle(ev.target.value)}
				/>
				<TagEditor tags={tags} onChange={setTags} />
				<Editor name="content" setContent={setContent} defaultValue={content} />
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
					<Button type="button" className="rounded-0 cursor-pointer" onClick={() => setModalOpen(true)}>
						다음
					</Button>
				</div>
			</div>
			{isModalOpen && (
				<CustomModal afterCloseModal={toggleModal} className="w-full mt-[10%] md:min-w-[500px] md:w-[25%]">
					<form action={formAction} onSubmit={handleSubmit}>
						<PostSetting onChangeImage={setFeaturedImage} onChangeVisibie={setVisibility} />
					</form>
				</CustomModal>
			)}
		</div>
	);
}
