'use client';

import { useEffect, useState } from 'react';
import { Label } from './ui/label';
import ImageFileupload from './ImageFileupload';
import ImagePreview from './ImagePreview';
import { RadioGroup, RadioItem } from './RadioGroup';
import { Button } from './ui/button';

interface PostSetting {
	onChangeImage: (image: string | null) => void;
	onChangeVisibie: (type: 'public' | 'private') => void;
}

export default function PostSetting({ onChangeImage, onChangeVisibie }: PostSetting) {
	const [file, setFile] = useState<File | null>();
	const [imageUrl, setImageUrl] = useState<string | null>();
	const [postType, setPostType] = useState<'public' | 'private'>('public');

	useEffect(() => {
		if (!file) {
			setImageUrl(null);
			onChangeImage(null);
			return;
		}
		const reader = new FileReader();

		reader.onloadend = function (e) {
			handleChangeImage(e.target?.result as string);
		};

		reader.readAsDataURL(file);
	}, [file]);

	useEffect(() => {
		onChangeVisibie(postType);
	}, [postType, onChangeVisibie]);

	const handleChangeImage = (imageUrl: string | null) => {
		setImageUrl(imageUrl);
		onChangeImage(imageUrl);
	};

	return (
		<div className="my-0 mx-auto min-h-[250px]">
			<div className="px-4 py-2">
				<div className="mb-3">
					<Label className="text-lg font-bold text-center mb-3">포스트 게시하기</Label>
					<Label className="text-base mb-2 text-neutral-700">대표 이미지</Label>
					{imageUrl ? (
						<ImagePreview src={imageUrl} onChangeImage={handleChangeImage} />
					) : (
						<ImageFileupload onChangeFile={setFile} />
					)}
				</div>
				<div className="mb-3">
					<Label className="text-base mb-2 text-neutral-700">게시물 공개</Label>
					<RadioGroup defaultValue="public" name="postType">
						<RadioItem value="public">공개</RadioItem>
						<RadioItem value="private">비공개</RadioItem>
					</RadioGroup>
				</div>
				<div className="mb-3">
					<Button type="submit" className="w-full">
						게시하기
					</Button>
				</div>
			</div>
		</div>
	);
}
