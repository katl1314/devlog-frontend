import Image from 'next/image';
import type { ICard } from '@/types/type';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default function PostCard({ id, title, thumbnail, comments, date, summary }: ICard) {
	return (
		<section className="mt-10">
			<Link href={`/@${id}`}>
				<div>
					<div className="relative w-full h-[300px]">
						{/* Next.js 13이전까지는 layout, objectFit을 사용하여 이미지 비율을 맞춤. => 특히 fill속성을 사용하여 부모 요소 크기만큼 채울때 다만 이는 이미지 비율을 보장하지 못한다. */}
						<Image src={thumbnail} alt={title} fill style={{ objectFit: 'cover' }}></Image>
					</div>
				</div>
				<div className="flex flex-col h-[120px] justify-between py-2">
					<div>
						<div className="text-2xl font-bold">{title}</div>
						<div className="text-sm pt-6">{summary}</div>
					</div>
					<div className="flex flex-row gap-2 py-3 text-neutral-500">
						<Label>{date}</Label>
						<Label>{comments}개의 댓글</Label>
					</div>
				</div>
			</Link>
			<Separator />
		</section>
	);
}
