import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Post } from '@/types/type';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import Link from 'next/link';
import PostMeta from './PostMeta';
import { AiFillLike } from 'react-icons/ai';

export default function PostCard({ path, title, created_at, summary, userId }: Post) {
	return (
		<Card>
			<Link href={path!}>
				<CardHeader>
					<div className="relative w-full h-[200px]">
						{/* <Image src={thumbnail} alt={title} fill style={{ objectFit: 'cover' }}></Image> */}
					</div>
				</CardHeader>
				<CardContent className="flex flex-col h-[120px] justify-between py-2">
					<div>
						<CardTitle>{title}</CardTitle>
						<CardDescription className="text-sm pt-2">{summary}</CardDescription>
					</div>
					<div className="flex flex-row gap-3 py-3 text-neutral-500">
						<PostMeta date={created_at!} />
						<Label>{0}개의 댓글</Label>
						<Label className="gap-1">
							<AiFillLike />
							<span>0</span>
						</Label>
					</div>
				</CardContent>
			</Link>
			<Separator />
			<CardFooter className="flex justify-between py-3">
				<Label>
					<Link href={`/@${userId}`}>{userId}</Link>
				</Label>
			</CardFooter>
		</Card>
	);
}
