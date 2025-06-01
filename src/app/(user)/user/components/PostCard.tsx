import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import type { Post } from '@/types/type';
import PostMeta from '@/components/PostMeta';
import { Label } from '@/components/ui/label';
import { AiFillLike } from 'react-icons/ai';

export default function PostCard({ thumbnail, path, title, created_at, summary }: Post) {
	return (
		<div className="mb-4">
			<Link href={`./${path}`}>
				<div>
					{thumbnail && (
						<div className="relative w-full h-[200px] lg:h-[400px]">
							<Image src={thumbnail} alt="썸네일 이미지" fill className="object-cover"></Image>
						</div>
					)}
				</div>
				<div className="flex flex-col h-[120px] justify-between py-2 min-h-[120px] gap-4">
					<div>
						<div className="text-2xl font-bold">{title}</div>
						<div className="text-sm pt-2">{summary}</div>
					</div>
					<div className="flex flex-row gap-3 py-3 text-neutral-500">
						<PostMeta date={created_at} />
						<Label>{0}개의 댓글</Label>
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
