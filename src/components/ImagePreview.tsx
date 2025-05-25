'use client';
import { useState } from 'react';
import { RxMinus } from 'react-icons/rx';

interface ImageFileupload {
	file: File;
	onChangeImage: (file: File | null) => void;
}

export default function ImagePreview({ file, onChangeImage }: ImageFileupload) {
	const [imageUrl, setImageUrl] = useState<string | null>();
	const reader = new FileReader();

	reader.onloadend = function (ev) {
		const imageUrl = ev.target?.result as string;
		setImageUrl(imageUrl);
	};

	reader.readAsDataURL(file);

	if (!imageUrl) return;

	return (
		<div className="relative group">
			<img src={imageUrl} alt="대표이미지" className="h-48 w-full object-cover" />
			<div
				className="hidden w-[25px] h-[25px] rounded-[50%] bg-neutral-400 top-[-10px] left-[-10px] absolute cursor-pointer group-hover:block"
				onClick={() => {
					onChangeImage(null);
				}}
			>
				<RxMinus color="white" className="translate-[25%]" />
			</div>
		</div>
	);
}
