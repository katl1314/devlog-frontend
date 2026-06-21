'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Plus, Pencil, Trash2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { seriesService, Series } from '@/services/series.service';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ConfirmDialog } from '@/components/confirm-dialog';

export default function UserSeriesSection({ userId }: { userId: string }) {
	const { data: session } = useSession();
	const isOwner = session?.user?.id === userId;

	const [seriesList, setSeriesList] = useState<Series[]>([]);
	const [loading, setLoading] = useState(true);

	const loadSeries = () =>
		seriesService
			.findByUserId(userId)
			.then(setSeriesList)
			.finally(() => setLoading(false));

	useEffect(() => {
		loadSeries();
	}, [userId]);

	if (loading) return <div className="p-4 sm:p-6" />;

	return (
		<div className="p-4 sm:p-6">
			{isOwner && (
				<div className="mb-4 flex justify-end">
					<SeriesFormDialog onSuccess={loadSeries} accessToken={session!.accessToken!}>
						<Button size="sm" className="gap-1.5 cursor-pointer">
							<Plus size={15} /> 시리즈 추가
						</Button>
					</SeriesFormDialog>
				</div>
			)}

			{seriesList.length === 0 ? (
				<div className="flex flex-col items-center justify-center py-24 text-center px-6">
					<div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-5">
						<BookOpen size={28} strokeWidth={1.5} className="text-muted-foreground" />
					</div>
					<p className="text-base font-semibold text-foreground">아직 시리즈가 없습니다</p>
					<p className="mt-1.5 text-sm text-muted-foreground">포스트를 묶어 시리즈로 정리해보세요</p>
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					{seriesList.map(series => (
						<SeriesCard
							key={series.id}
							series={series}
							userId={userId}
							isOwner={isOwner}
							accessToken={session?.accessToken}
							onMutate={loadSeries}
						/>
					))}
				</div>
			)}
		</div>
	);
}

interface SeriesCardProps {
	series: Series;
	userId: string;
	isOwner: boolean;
	accessToken?: string;
	onMutate: () => void;
}

function SeriesCard({ series, userId, isOwner, accessToken, onMutate }: SeriesCardProps) {
	const updatedAt = new Date(series.updated_at).toLocaleDateString('ko-KR', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	const handleDelete = async () => {
		if (!accessToken) return;
		await seriesService.remove(series.id, accessToken);
		onMutate();
	};

	return (
		<div className="group bg-muted border border-border rounded-2xl overflow-hidden hover:border-foreground/20 transition-colors relative">
			{/* 썸네일 */}
			<Link href={`/@${userId}?tab=series&id=${series.id}`} className="block">
				<div className="relative w-full aspect-video bg-background">
					{series.thumbnail ? (
						<Image src={series.thumbnail} alt={series.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
					) : (
						<div className="absolute inset-0 flex items-center justify-center">
							<BookOpen size={36} strokeWidth={1.2} className="text-muted-foreground/40" />
						</div>
					)}
				</div>

				{/* 정보 */}
				<div className="p-4">
					<h3 className="font-bold text-[15px] leading-snug text-foreground mb-2 line-clamp-2 group-hover:text-foreground/70 transition-colors">
						{series.name}
					</h3>
					<div className="flex items-center justify-between">
						<p className="text-xs text-muted-foreground">{updatedAt}</p>
						<p className="text-xs font-medium text-muted-foreground">{series.post_count ?? 0}개의 포스트</p>
					</div>
				</div>
			</Link>

			{/* 오너 액션 버튼 */}
			{isOwner && accessToken && (
				<div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
					<SeriesFormDialog series={series} onSuccess={onMutate} accessToken={accessToken}>
						<Button variant="ghost" className="h-auto p-1.5 rounded-lg bg-background/80 backdrop-blur hover:bg-background border border-border">
							<Pencil size={13} className="size-3.25" />
						</Button>
					</SeriesFormDialog>
					<ConfirmDialog
						title={`${series.name} 삭제`}
						description="포스트는 삭제되지 않고 시리즈에서만 제외됩니다."
						confirmText="삭제"
						variant="destructive"
						onConfirm={handleDelete}
					>
						<Button variant="ghost" className="h-auto p-1.5 rounded-lg bg-background/80 backdrop-blur hover:bg-background border border-border text-red-500 hover:text-red-500">
							<Trash2 size={13} className="size-3.25" />
						</Button>
					</ConfirmDialog>
				</div>
			)}
		</div>
	);
}

interface SeriesFormDialogProps {
	series?: Series;
	onSuccess: () => void;
	accessToken: string;
	children: React.ReactNode;
}

function SeriesFormDialog({ series, onSuccess, accessToken, children }: SeriesFormDialogProps) {
	const [open, setOpen] = useState(false);
	const [name, setName] = useState(series?.name ?? '');
	const [description, setDescription] = useState(series?.description ?? '');
	const [submitting, setSubmitting] = useState(false);

	useEffect(() => {
		if (open) {
			setName(series?.name ?? '');
			setDescription(series?.description ?? '');
		}
	}, [open, series]);

	const handleSubmit = async () => {
		if (!name.trim()) return;
		setSubmitting(true);
		try {
			if (series) {
				await seriesService.update(
					series.id,
					{ name: name.trim(), description: description.trim() || undefined },
					accessToken
				);
			} else {
				await seriesService.create({ name: name.trim(), description: description.trim() || undefined }, accessToken);
			}
			onSuccess();
			setOpen(false);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="flex flex-col gap-0 p-0 sm:max-w-md">
				<DialogHeader className="px-6 pt-6 pb-4 border-b shrink-0">
					<DialogTitle>{series ? '시리즈 수정' : '시리즈 추가'}</DialogTitle>
				</DialogHeader>
				<div className="px-6 py-5 space-y-4">
					<div className="space-y-1.5">
						<Label className="text-sm font-semibold">시리즈 이름 *</Label>
						<input
							value={name}
							onChange={e => setName(e.target.value)}
							maxLength={40}
							placeholder="시리즈 이름을 입력하세요"
							className="w-full bg-muted rounded-lg border border-transparent focus:border-indigo-500 focus:bg-background focus:ring-4 focus:ring-indigo-500/10 px-4 py-2.5 text-sm outline-none transition-all"
						/>
					</div>
					<div className="space-y-1.5">
						<Label className="text-sm font-semibold">설명</Label>
						<textarea
							value={description}
							onChange={e => setDescription(e.target.value)}
							placeholder="시리즈에 대한 간단한 설명을 입력하세요"
							rows={3}
							className="w-full bg-muted rounded-lg border border-transparent focus:border-indigo-500 focus:bg-background focus:ring-4 focus:ring-indigo-500/10 px-4 py-2.5 text-sm outline-none resize-none transition-all"
						/>
					</div>
					<div className="flex justify-end gap-2 pt-1">
						<Button variant="ghost" onClick={() => setOpen(false)} className="cursor-pointer">
							취소
						</Button>
						<Button
							onClick={handleSubmit}
							disabled={!name.trim() || submitting}
							className="bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
						>
							{series ? '저장' : '추가'}
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
