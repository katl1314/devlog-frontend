'use client';

import { ChangeEventHandler, useEffect, useState } from 'react';
import { usePost } from '@/hooks/post';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { FiGlobe, FiLock, FiUploadCloud } from 'react-icons/fi';
import ImageUpload from '@/components/image-upload';
import { seriesService, Series } from '@/services/series.service';

export default function PostSetting({ url_slug, userId }: { url_slug: string; userId: string }) {
	const { summary, setSummary, visibility, setVisibility, path, setPath, setFile, seriesId, setSeriesId } = usePost();

	const [seriesList, setSeriesList] = useState<Series[]>([]);

	useEffect(() => {
		if (!userId) return;
		seriesService
			.findByUserId(userId)
			.then(setSeriesList)
			.catch(() => {});
	}, [userId]);

	const handlePathChange: ChangeEventHandler<HTMLInputElement> = ev =>
		setPath(ev.target.value.replace(/\s+/g, '-').toLowerCase());

	return (
		<div className="flex flex-col md:flex-row w-full h-auto md:h-137.5 overflow-hidden">
			{/* --- 좌측: 썸네일 영역 --- */}
			<div className="w-full md:w-2/5 bg-muted border-b md:border-b-0 md:border-r border-border flex flex-col items-center justify-center p-6 md:p-8 relative min-h-62.5 md:min-h-auto">
				<div className="absolute inset-0 opacity-40 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] bg-size-[20px_20px]" />

				<div className="relative z-10 w-full flex flex-col items-center">
					<h3 className="text-lg font-bold text-foreground mb-4 md:mb-6">포스트 미리보기</h3>

					<ImageUpload onFileChange={file => file && setFile(file)}>
						<ImageUpload.Upload className="w-full aspect-video bg-background rounded-xl border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center text-muted-foreground gap-3 group hover:border-foreground/30 hover:text-foreground transition-all duration-300 cursor-pointer">
							<div className="p-3 md:p-4 rounded-full bg-muted group-hover:bg-muted/60 transition-colors">
								<FiUploadCloud size={28} className="md:w-8 md:h-8" />
							</div>
							<span className="text-xs md:text-sm font-semibold">썸네일 업로드</span>
						</ImageUpload.Upload>
						<ImageUpload.Preview className="w-full aspect-video rounded-xl overflow-hidden" />
					</ImageUpload>

					<p className="mt-4 text-xs text-muted-foreground text-center leading-relaxed hidden md:block">
						16:9 비율의 이미지를 권장합니다.
						<br />
					</p>
				</div>
			</div>

			{/* --- 우측: 설정 폼 영역 --- */}
			<div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col bg-background">
				<div className="flex-1 space-y-5 md:space-y-6">
					{/* 1. 공개 범위 설정 */}
					<div className="space-y-2 md:space-y-3">
						<Label className="text-sm font-bold text-foreground">공개 범위</Label>
						<div className="flex p-1.5 bg-muted rounded-lg">
							<Button
								type="button"
								variant="ghost"
								name="visibility"
								onClick={() => setVisibility(true)}
								className={`flex-1 h-auto py-2 md:py-2.5 text-sm font-semibold rounded-md transition-all duration-200 ${
									visibility
										? 'bg-background text-indigo-600 shadow-sm hover:bg-background hover:text-indigo-600'
										: 'text-muted-foreground hover:text-foreground'
								}`}
							>
								<FiGlobe size={16} /> 전체 공개
							</Button>
							<Button
								type="button"
								variant="ghost"
								name="visibility"
								onClick={() => setVisibility(false)}
								className={`flex-1 h-auto py-2 md:py-2.5 text-sm font-semibold rounded-md transition-all duration-200 ${
									!visibility
										? 'bg-background text-indigo-600 shadow-sm hover:bg-background hover:text-indigo-600'
										: 'text-muted-foreground hover:text-foreground'
								}`}
							>
								<FiLock size={16} /> 비공개
							</Button>
						</div>
					</div>

					{/* 2. 시리즈 선택 */}
					<div className="space-y-2 md:space-y-3">
						<Label className="text-sm font-bold text-foreground">시리즈</Label>
						<select
							value={seriesId ?? ''}
							onChange={ev => setSeriesId(ev.target.value || null)}
							className="w-full bg-muted rounded-lg border border-transparent focus:border-indigo-500 focus:bg-background focus:ring-4 focus:ring-indigo-500/10 px-4 py-3 text-sm text-foreground outline-none transition-all duration-200 cursor-pointer"
						>
							<option value="">시리즈 없음</option>
							{seriesList.map(s => (
								<option key={s.id} value={s.id}>
									{s.name}
								</option>
							))}
						</select>
					</div>

					{/* 3. URL 설정 */}
					<div className="space-y-2 md:space-y-3">
						<Label className="text-sm font-bold text-foreground">URL 설정</Label>
						<div className="flex items-center bg-muted rounded-lg px-4 border border-transparent focus-within:border-indigo-500 focus-within:bg-background focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all duration-200">
							<span className="text-muted-foreground text-sm font-medium select-none tracking-tight whitespace-nowrap">
								{url_slug}/
							</span>
							<input
								type="text"
								value={path}
								onChange={handlePathChange}
								placeholder="URL을 입력하세요."
								className="w-full bg-transparent border-none outline-none py-3 pl-1 text-sm text-foreground placeholder:text-muted-foreground font-medium min-w-0"
							/>
						</div>
					</div>

					{/* 4. 포스트 요약 */}
					<div className="space-y-2 md:space-y-3">
						<div className="flex justify-between items-end">
							<Label className="text-sm font-bold text-foreground">포스트 소개</Label>
							<span
								className={`text-xs font-medium ${summary?.length > 150 ? 'text-red-500' : 'text-muted-foreground'}`}
							>
								{summary?.length || 0}/150
							</span>
						</div>
						<textarea
							value={summary}
							name="summary"
							onChange={ev => setSummary(ev.target.value)}
							placeholder="이 포스트를 짧게 소개해보세요."
							className="w-full h-20 md:h-24 bg-muted rounded-lg border border-transparent focus:border-indigo-500 focus:bg-background focus:ring-4 focus:ring-indigo-500/10 p-4 text-sm resize-none transition-all duration-200 placeholder:text-muted-foreground outline-none"
							maxLength={150}
						/>
					</div>
				</div>

				{/* 5. 하단 버튼 그룹 */}
				<div className="flex justify-end gap-3 pt-5 pb-4 mt-2 border-t border-border">
					<Button
						variant="ghost"
						className="text-muted-foreground hover:bg-muted hover:text-foreground font-semibold px-5"
					>
						취소
					</Button>
					<Button
						type="submit"
						className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-2.5 rounded-lg transition-all duration-200 active:scale-95"
					>
						게시하기
					</Button>
				</div>
			</div>
		</div>
	);
}
