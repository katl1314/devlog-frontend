'use client';
import { useState } from 'react';
import { RxMinus } from 'react-icons/rx';

interface ImageFileupload {
	src: string;
	onChangeImage: (image: string | null) => void;
}

export default function ImagePreview({ src, onChangeImage }: ImageFileupload) {
	return (
		<div className="relative group">
			<img src={src} alt="대표이미지" className="h-48 w-full object-cover" />
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
