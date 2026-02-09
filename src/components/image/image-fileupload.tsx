'use client';
import { ChangeEventHandler, MouseEventHandler, useRef } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import { Label } from '../ui/label';

interface ImageFileUploadProps {
	onChangeFile: (file: File) => void;
}

export default function ImageFileUpload({ onChangeFile }: ImageFileUploadProps) {
	const imageRef = useRef<HTMLInputElement>(null);
	const handleFileClick: MouseEventHandler = () => {
		if (imageRef?.current) {
			imageRef.current.click();
		}
	};

	const handleFileChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
		const file = target.files?.[0];
		onChangeFile(file!);
	};
	return (
		<div
			onClick={handleFileClick} onChange={handleFileChange}
			className="w-full aspect-video bg-white rounded-xl flex flex-col items-center justify-center text-slate-400 gap-3 group hover:border-indigo-400 hover:text-indigo-500 transition-all duration-300 cursor-pointer">
			<input type="file" name="" id="" accept="image/*" className="hidden" size={500000} ref={imageRef} />
			<div className="p-3 md:p-4 rounded-full bg-slate-50 group-hover:bg-indigo-50 transition-colors">
				<FiUploadCloud size={28} className="md:w-8 md:h-8" />
			</div>
			<Label className="text-xs md:text-sm font-semibold">썸네일 업로드</Label>
		</div>
	);
}

{/*<div className="cursor-pointer h-48 flex flex-col items-center justify-center rounded-lg border-gray-300 bg-gray-50 hover:bg-gray-100 group">*/}
{/*	<FiUploadCloud size={45} color="gray" className="mb-2" />*/}
{/*	<Label className="text-base text-gray-500 mb-2 group-hover:cursor-pointer">클릭하여 이미지 업로드</Label>*/}
{/*	<Label className="text-sm text-gray-500 mb-2 group-hover:cursor-pointer">JPG (최대 5MB)</Label>*/}
{/*</div>*/}