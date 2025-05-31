import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import type { Post } from '@/types/type';
import PostMeta from '@/components/PostMeta';

export default function PostCard({ thumbnail, path, title, created_at, summary }: Post) {
	return (
		<div className="mb-4">
			<Link href={`./${path}`}>
				<div>
					{thumbnail && (
						<div className="relative w-full h-[300px]">
							{/* <Image src={thumbnail} alt="썸네일 이미지" fill style={{ objectFit: 'cover' }}></Image> */}
						</div>
					)}
				</div>
				<div className="flex flex-col h-[120px] justify-between py-2 min-h-[150px] gap-4">
					<div>
						<div className="text-2xl font-bold">{title}</div>
						<div className="text-sm pt-6">{summary}</div>
					</div>
					<PostMeta date={created_at!} comments={0} />
				</div>
			</Link>
			<Separator />
		</div>
	);
}
