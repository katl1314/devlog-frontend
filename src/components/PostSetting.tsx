'use client';

import { MouseEventHandler, useRef, useState } from 'react';
import { Label } from './ui/label';
import { IoImageOutline } from 'react-icons/io5';

const PostSetting = () => {
	const [file, setFile] = useState<File>();
	const imageRef = useRef<HTMLInputElement>(null);

	const handleFileChange: MouseEventHandler = () => {
		if (imageRef?.current) {
			imageRef.current.click();
		}
	};

	return (
		<div className="my-0 mx-auto min-h-[250px]">
			<div className="px-4 py-2">
				<Label className="text-lg font-bold text-center">포스트 설정</Label>
			</div>
			<div className="px-4 py-2">
				<Label className="text-base mb-3">대표 이미지</Label>
				<div onClick={handleFileChange} onChange={e => console.log(e.target)}>
					<input type="file" name="" id="" accept="image/*" className="hidden" size={500000} ref={imageRef} />
					<div className="cursor-pointer h-48 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 group">
						<IoImageOutline size={45} color="gray" className="mb-2" />
						<Label className="text-base text-gray-500 mb-2 group-hover:cursor-pointer">클릭하여 이미지 업로드</Label>
						<Label className="text-base text-gray-500 mb-2 group-hover:cursor-pointer">
							JPG, PNG, GIF, HEIC, HEIF (최대 5MB)
						</Label>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostSetting;
