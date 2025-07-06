'use client';
import { IoImageOutline } from 'react-icons/io5';
import { ChangeEventHandler, MouseEventHandler, useRef } from 'react';
import { Label } from '../ui/label';

interface IImageFileupload {
	onChangeFile: (file: File) => void;
}

export default function ImageFileupload({ onChangeFile }: IImageFileupload) {
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
		<div onClick={handleFileClick} onChange={handleFileChange}>
			<input type="file" name="" id="" accept="image/*" className="hidden" size={500000} ref={imageRef} />
			<div className="cursor-pointer h-48 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 group">
				<IoImageOutline size={45} color="gray" className="mb-2" />
				<Label className="text-base text-gray-500 mb-2 group-hover:cursor-pointer">클릭하여 이미지 업로드</Label>
				<Label className="text-sm text-gray-500 mb-2 group-hover:cursor-pointer">JPG (최대 5MB)</Label>
			</div>
		</div>
	);
}
