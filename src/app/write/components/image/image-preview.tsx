'use client';
import { RxMinus } from 'react-icons/rx';

interface ImageFilePreviewProps {
	src: string;
	onChangeImage: (image: string) => void;
}

export default function ImagePreview({ src, onChangeImage }: ImageFilePreviewProps) {
	return (
		<div className="relative group">
			<img src={src} alt="대표이미지" className="h-48 w-full object-cover" />
			<div
				className="hidden w-[25px] h-[25px] rounded-[50%] bg-neutral-400 top-[-10px] left-[-10px] absolute cursor-pointer group-hover:block"
				onClick={() => {
					onChangeImage('');
				}}
			>
				<RxMinus color="white" className="translate-[25%]" />
			</div>
		</div>
	);
}
