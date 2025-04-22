import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import type { Post } from '@/types/type';
import { Label } from '@/components/ui/label';
import { AiFillLike } from 'react-icons/ai';
import Dayjs from 'dayjs';
import { getTimeDiff } from '@/utils/time';

export default function PostCard({ thumbnail, path, title, created_at, summary }: Partial<Post>) {
	const created_dt = Dayjs(created_at);

	return (
		<div className="mb-4">
			<Link href={`./${path}`}>
				<div>
					{thumbnail && (
						<div className="relative w-full h-[300px]">
							<Image src={thumbnail} alt="썸네일 이미지" fill style={{ objectFit: 'cover' }}></Image>
						</div>
					)}
				</div>
				<div className="flex flex-col h-[120px] justify-between py-2 min-h-[150px] gap-4">
					<div>
						<div className="text-2xl font-bold">{title}</div>
						<div className="text-sm pt-6">{summary}</div>
					</div>
					<div className="flex flex-row gap-3 py-3 text-neutral-500">
						<Label>{getTimeDiff(created_dt)}</Label>.<Label>{0}개의 댓글</Label>.
						<Label className="gap-1">
							<AiFillLike />
							<span>0</span>
						</Label>
					</div>
				</div>
			</Link>
			<Separator />
		</div>
	);
}
