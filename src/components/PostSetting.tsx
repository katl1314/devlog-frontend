'use client';

import { useEffect, useState } from 'react';
import { Label } from './ui/label';
import ImageFileupload from './ImageFileupload';
import ImagePreview from './ImagePreview';
import { RadioGroup, RadioItem } from './RadioGroup';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { usePost } from '@/store/post';

export default function PostSetting() {
	const { summary, setSummary, thumbnail, setThumbnail, setVisibility } = usePost();
	const [file, setFile] = useState<File | null>();

	useEffect(() => {
		if (!file) {
			return;
		}

		const reader = new FileReader();
		reader.onloadend = e => handleChangeImage(e.target?.result as string);
		reader.readAsDataURL(file);
	}, [file]);

	const handleChangeImage = (imageUrl: string) => setThumbnail(imageUrl);

	return (
		<div className="my-0 mx-auto min-h-[250px]">
			<div className="px-4 py-2">
				<div className="mb-3">
					<Label className="text-lg font-bold text-center mb-3">포스트 게시하기</Label>
					<Label className="text-base mb-2 text-neutral-700">대표 이미지</Label>
					{thumbnail ? (
						<ImagePreview src={thumbnail} onChangeImage={handleChangeImage} />
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
					<Label className="text-base mb-2 text-neutral-700">포스트 요약</Label>
					<Textarea value={summary} onChange={ev => setSummary(ev.target.value)} placeholder="요약을 입력하세요." />
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
