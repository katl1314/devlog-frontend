'use client';

import { ChangeEventHandler, useEffect, useState } from 'react';
import { usePost } from '@/hooks/post';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { FiGlobe, FiLock } from 'react-icons/fi';
import ImageFileUpload from '../image/image-fileupload';
import ImagePreview from '../image/image-preview';

export default function PostSetting({ url_slug }: { url_slug: string }) {
	const {
		summary,
		setSummary,
		visibility,
		setVisibility,
		path,
		setPath,
		setFile,
		file,
	} = usePost();

	const [thumbnail, setThumbnail] = useState<string>();
	const handleChangeImage = (imageUrl: string) => setThumbnail(imageUrl);
	const handlePathChange: ChangeEventHandler<HTMLInputElement> = (ev) =>
		setPath(ev.target.value.replace(/\s+/g, '-').toLowerCase());


	useEffect(() => {
		if (!file) {
			return;
		}

		const reader = new FileReader();
		reader.onloadend = e => handleChangeImage(e.target?.result as string);
		reader.readAsDataURL(file);
	}, [file]);

	return (
		<div className="flex flex-col md:flex-row w-full h-auto md:h-[550px] overflow-hidden rounded-2xl bg-white shadow-xl border border-neutral-100">

			{/* --- 좌측: 썸네일 영역 --- */}
			{/* w-full (모바일) -> md:w-2/5 (데스크탑) */}
			<div className="w-full md:w-2/5 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-100 flex flex-col items-center justify-center p-6 md:p-8 relative min-h-[250px] md:min-h-auto">
				<div className="absolute inset-0 opacity-40 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px]" />

				<div className="relative z-10 w-full flex flex-col items-center">
					<h3 className="text-lg font-bold text-slate-800 mb-4 md:mb-6">포스트 미리보기</h3>

					<div className="w-full aspect-video bg-white rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 gap-3 group hover:border-indigo-400 hover:text-indigo-500 transition-all duration-300 cursor-pointer">
						{thumbnail ? (
							<ImagePreview src={thumbnail} onChangeImage={handleChangeImage} />
						) : (
							<ImageFileUpload onChangeFile={setFile} />
						)}
					</div>

					<p className="mt-4 text-xs text-slate-500 text-center leading-relaxed hidden md:block">
						16:9 비율의 이미지를 권장합니다.<br/>
					</p>
				</div>
			</div>

			{/* --- 우측: 설정 폼 영역 --- */}
			{/* w-full (모바일) -> md:w-3/5 (데스크탑) */}
			<div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col bg-white">
				<div className="flex-1 space-y-5 md:space-y-7">

					{/* 1. 공개 범위 설정 */}
					<div className="space-y-2 md:space-y-3">
						<Label className="text-sm font-bold text-slate-700">공개 범위</Label>
						<div className="flex p-1.5 bg-slate-100 rounded-lg">
							<button
								type="button"
								onClick={() => setVisibility('PUBLIC')}
								className={`flex-1 flex items-center justify-center gap-2 py-2 md:py-2.5 text-sm font-semibold rounded-md transition-all duration-200 ${
									visibility === 'PUBLIC'
										? 'bg-white text-indigo-600 shadow-sm'
										: 'text-slate-500 hover:text-slate-700'
								}`}
							>
								<FiGlobe size={16} /> 전체 공개
							</button>
							<button
								type="button"
								onClick={() => setVisibility('PRIVATE')}
								className={`flex-1 flex items-center justify-center gap-2 py-2 md:py-2.5 text-sm font-semibold rounded-md transition-all duration-200 ${
									visibility === 'PRIVATE'
										? 'bg-white text-indigo-600 shadow-sm'
										: 'text-slate-500 hover:text-slate-700'
								}`}
							>
								<FiLock size={16} /> 비공개
							</button>
						</div>
					</div>

					{/* 2. URL 설정 */}
					<div className="space-y-2 md:space-y-3">
						<Label className="text-sm font-bold text-slate-700">URL 설정</Label>
						<div className="flex items-center bg-slate-100 rounded-lg px-4 border border-transparent focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all duration-200">
							<span className="text-slate-500 text-sm font-medium select-none tracking-tight whitespace-nowrap">{url_slug}/</span>
							<input
								type="text"
								value={path}
								onChange={handlePathChange}
								placeholder="URL을 입력하세요."
								className="w-full bg-transparent border-none outline-none py-3 pl-1 text-sm text-slate-800 placeholder:text-slate-400 font-medium min-w-0"
							/>
						</div>
					</div>

					{/* 3. 포스트 요약 */}
					<div className="space-y-2 md:space-y-3">
						<div className="flex justify-between items-end">
							<Label className="text-sm font-bold text-slate-700">포스트 소개</Label>
							<span className={`text-xs font-medium ${summary?.length > 150 ? 'text-red-500' : 'text-slate-400'}`}>
                {summary?.length || 0}/150
              </span>
						</div>
						<textarea
							value={summary}
							onChange={(ev) => setSummary(ev.target.value)}
							placeholder="이 포스트를 짧게 소개해보세요."
							className="w-full h-24 md:h-28 bg-slate-100 rounded-lg border border-transparent focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 p-4 text-sm resize-none transition-all duration-200 placeholder:text-slate-400 outline-none"
							maxLength={150}
						/>
					</div>
				</div>

				{/* 4. 하단 버튼 그룹 */}
				<div className="flex justify-end gap-3 pt-6 mt-2 border-t border-slate-50">
					<Button
						variant="ghost"
						className="text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-semibold px-5"
					>
						취소
					</Button>
					<Button
						type="submit"
						className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-2.5 rounded-lg shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all duration-200 transform active:scale-95"
					>
						게시하기
					</Button>
				</div>
			</div>
		</div>
	);
}