'use client';

import { useState } from 'react';
import { Label } from './ui/label';
import ImageFileupload from './ImageFileupload';
import ImagePreview from './ImagePreview';

const PostSetting = () => {
	const [file, setFile] = useState<File | null | undefined>();

	return (
		<div className="my-0 mx-auto min-h-[250px]">
			<div className="px-4 py-2">
				<Label className="text-lg font-bold text-center mb-3">포스트 설정</Label>
				<Label className="text-base mb-2">대표 이미지</Label>
				{file ? <ImagePreview file={file} onChangeImage={setFile} /> : <ImageFileupload onChangeImage={setFile} />}

				<div></div>
			</div>
		</div>
	);
};

export default PostSetting;
