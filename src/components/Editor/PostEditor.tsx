'use client';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import { Label } from '../ui/label';

const MDEditor = dynamic(() => import('@uiw/react-md-editor').then(mod => mod.default));

export default function PostEditor() {
	// 모바일인지 아닌지 확인은 해상도를 통해서...
	const [value, setValue] = useState('');

	return (
		<div className="">
			<div className="hidden md:block">
				<MDEditor value={value} onChange={value => setValue(value!)} fullscreen={true} />
			</div>
			<div className="block md:hidden">
				<MDEditor value={value} onChange={value => setValue(value!)} fullscreen={true} preview={'edit'} />
			</div>
			<div className="w-full bottom-[10px] fixed flex z-[10000] justify-around items-center">
				<div className="flex gap-4">
					<Link href="/" className="flex items-center p-2 gap-2 group hover:bg-black">
						<FiArrowLeft size={28} className="group-hover:stroke-[white] cursor-pointer" />
						<Label className="group-hover:text-white text-lg font-bold cursor-pointer">이전</Label>
					</Link>
				</div>
				<div className="flex gap-4">
					<Button type="button" className="rounded-0 cursor-pointer" variant="outline">
						미리 저장
					</Button>
					<Button type="button" className="rounded-0 cursor-pointer">
						제출하기
					</Button>
				</div>
			</div>
		</div>
	);
}
