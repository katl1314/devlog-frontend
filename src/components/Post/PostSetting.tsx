'use client';

import { ChangeEventHandler, useEffect, useState } from 'react';
import { Label } from '../ui/label';
import ImageFileupload from '../image/ImageFileupload';
import ImagePreview from '../image/ImagePreview';
import { RadioGroup, RadioItem } from '../form/RadioGroup';
import { Button } from '../ui/button';
import { usePost } from '@/store/post';
import { useProfile } from '@/store/profile';

export default function PostSetting() {
	const { summary, setSummary, file, setFile, setVisibility, visibility, path, setPath } = usePost();
	const [thumbnail, setThumbnail] = useState<string>();
	const { userId } = useProfile();

	useEffect(() => {
		if (!file) {
			return;
		}

		const reader = new FileReader();
		reader.onloadend = e => handleChangeImage(e.target?.result as string);
		reader.readAsDataURL(file);
	}, [file]);

	const handleChangeImage = (imageUrl: string) => setThumbnail(imageUrl);
	const handlePathChange: ChangeEventHandler<HTMLInputElement> = ev => setPath(`${ev.target.value}`);

	return (
		<div className="mx-auto min-h-[250px]">
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
					<Label className="text-base mb-2 text-neutral-700">URL 설정</Label>
					<div className="flex h-[32px] border-1 border-[#e5e5e5] px-2">
						<Label className="text-base text-neutral-500">/@{userId}/</Label>
						<input
							className="border-0 py-0 h-[30px] pl-[1px] w-full"
							value={path}
							placeholder="URL을 입력하세요."
							onChange={handlePathChange}
						/>
					</div>
				</div>
				<div className="mb-3">
					<Label className="text-base mb-2 text-neutral-700">게시물 공개</Label>
					<RadioGroup value={visibility} onChangeItem={setVisibility} name="postType">
						<RadioItem value="PUBLIC">공개</RadioItem>
						<RadioItem value="PRIVATE">비공개</RadioItem>
					</RadioGroup>
				</div>
				<div className="mb-3">
					<Label className="text-base mb-2 text-neutral-700">포스트 요약</Label>
					<textarea
						value={summary}
						onChange={ev => setSummary(ev.target.value)}
						placeholder="요약을 입력하세요."
						className="w-full border-1 border-[#e5e5e5] p-2"
					/>
				</div>
				<div className="mb-3">
					<Button type="submit" className="rounded-0 cursor-pointer w-full">
						게시하기
					</Button>
				</div>
			</div>
		</div>
	);
}
