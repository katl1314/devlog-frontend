'use client';

import { createContext, useContext, useRef, useState } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import { RxMinus } from 'react-icons/rx';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface ImageUploadContextValue {
	previewUrl: string;
	triggerInput: () => void;
	clearImage: () => void;
}

const ImageUploadContext = createContext<ImageUploadContextValue | null>(null);

export function useImageUpload() {
	const ctx = useContext(ImageUploadContext);
	if (!ctx) throw new Error('useImageUpload must be used within <ImageUpload>');
	return ctx;
}

interface ImageUploadProps {
	children: React.ReactNode;
	initialUrl?: string;
	onFileChange?: (file: File | null) => void;
}

function ImageUpload({
	children,
	initialUrl = '',
	onFileChange
}: ImageUploadProps) {
	const [previewUrl, setPreviewUrl] = useState(initialUrl);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleFile = (file: File) => {
		onFileChange?.(file);
		const reader = new FileReader();
		reader.onloadend = e => setPreviewUrl(e.target?.result as string);
		reader.readAsDataURL(file);
	};

	const clearImage = () => {
		setPreviewUrl('');
		onFileChange?.(null);
		if (inputRef.current) inputRef.current.value = '';
	};

	return (
		<ImageUploadContext.Provider
			value={{
				previewUrl,
				triggerInput: () => inputRef.current?.click(),
				clearImage
			}}
		>
			<input
				ref={inputRef}
				type="file"
				accept="image/*"
				className="hidden"
				onChange={e => {
					const file = e.target.files?.[0];
					if (file) handleFile(file);
				}}
			/>
			{children}
		</ImageUploadContext.Provider>
	);
}

interface UploadProps {
	children?: React.ReactNode;
	className?: string;
}

function Upload({ children, className }: UploadProps) {
	const { previewUrl, triggerInput } = useImageUpload();
	if (previewUrl) return null;

	return (
		<div onClick={triggerInput} className={className}>
			{children ?? <FiUploadCloud size={28} />}
		</div>
	);
}

interface PreviewProps {
	className?: string;
	/** 이미지 클릭 시 다시 파일 선택 (기본: false) */
	allowReupload?: boolean;
	/** 이미지 위에 표시할 커스텀 오버레이 (기본: 좌상단 제거 버튼) */
	children?: React.ReactNode;
	width?: number;
	height?: number;
}

function Preview({ className, allowReupload = false, children, width, height }: PreviewProps) {
	const { previewUrl, clearImage, triggerInput } = useImageUpload();
	if (!previewUrl) return null;

	const hasSizeProps = width !== undefined && height !== undefined;

	return (
		<div
			className={`relative group ${allowReupload ? 'cursor-pointer' : ''} ${className ?? ''}`}
			onClick={allowReupload ? triggerInput : undefined}
		>
			{hasSizeProps ? (
				<Image
					src={previewUrl}
					alt="preview"
					width={width}
					height={height}
					className="object-cover"
				/>
			) : (
				<Image
					src={previewUrl}
					alt="preview"
					fill
					className="object-cover"
				/>
			)}
			{children ??
				(!allowReupload && (
					<Button
						type="button"
						variant="ghost"
						onClick={e => {
							e.stopPropagation();
							clearImage();
						}}
						className="hidden group-hover:flex absolute top-[-10px] left-[-10px] w-[25px] h-[25px] p-0 rounded-full bg-neutral-400 hover:bg-neutral-400/80"
					>
						<RxMinus color="white" />
					</Button>
				))}
		</div>
	);
}

ImageUpload.Upload = Upload;
ImageUpload.Preview = Preview;

export default ImageUpload;
