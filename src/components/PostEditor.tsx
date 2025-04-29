'use client';
import { Button } from './ui/button';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import { Label } from './ui/label';
import CustomEditor from './CustomEditor';

export default function PostEditor() {
	// 모바일인지 아닌지 확인은 해상도를 통해서...

	return (
		<div className="">
			<div>
				<CustomEditor />
			</div>
			<div className="w-full flex justify-between items-center">
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
