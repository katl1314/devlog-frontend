import Image from 'next/image';
import Link from 'next/link';
import PostMeta from './PostMeta';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { AiFillLike } from 'react-icons/ai';
import type { Post } from '@/types/type';

export default function PostCard({ path, title, created_at, thumbnail, summary, userId }: Post) {
	return (
		<Card>
			<Link href={path!}>
				<PostHeader thumbnail={thumbnail!}>
					<CardTitle className="pt-2">{title}</CardTitle>
					<CardDescription className="text-sm pt-2 line-clamp-4 text-ellipsis">{summary}</CardDescription>
				</PostHeader>
				<CardContent className="flex flex-col h-[120px] justify-end px-2">
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

const PostHeader = ({
	children,
	thumbnail
}: {
	children: React.ReactNode | React.ReactNode[];
	thumbnail?: string;
	title?: string;
}) => {
	const ThumbnailView = thumbnail && (
		<div className="relative w-full min-h-[200px]">
			<Image src={thumbnail!} alt={'thumbnail'} fill style={{ objectFit: 'cover' }}></Image>
		</div>
	);
	return (
		<CardHeader className="block max-h-[222px] h-[222px]">
			{ThumbnailView}
			{children}
		</CardHeader>
	);
};
