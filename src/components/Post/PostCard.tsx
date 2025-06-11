import Image from 'next/image';
import Link from 'next/link';
import PostMeta from './PostMeta';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import type { IPost } from '@/types/type';
import { AiFillLike } from 'react-icons/ai';

export default function PostCard({ path, title, created_at, thumbnail, summary, userId, comments }: IPost) {
	return (
		<Card>
			<Link href={path}>
				<PostHeader thumbnail={thumbnail!}>
					<CardTitle>{title}</CardTitle>
					<CardDescription className="pt-2 line-clamp-4 text-ellipsis">{summary}</CardDescription>
				</PostHeader>
				<CardContent className="flex flex-col h-[120px] justify-end px-2">
					<div className="flex flex-row gap-3 py-3 text-neutral-500">
						<PostMeta date={created_at} />
						<Label>{comments}개의 댓글</Label>
						<Label>
							<AiFillLike />
							{0}
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
			<Image src={thumbnail!} alt={'thumbnail'} fill className="object-cover rounded-t-xl"></Image>
		</div>
	);
	return (
		<CardHeader className="block max-h-[222px] h-[222px]">
			{ThumbnailView}
			<div className="px-2 pt-2">{children}</div>
		</CardHeader>
	);
};
