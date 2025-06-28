import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import type { IPost } from '@/types/type';
import PostMeta from '@/components/post/PostMeta';
import Thumbnail from './Thumbnail';
import { Label } from '@/components/ui/label';
import { GoHeart } from 'react-icons/go';

export default function PostCard({ thumbnail, path, title, created_at, summary, comments, like }: IPost) {
	return (
		<div className="mb-4">
			<Link href={`./${path}`}>
				<Thumbnail thumbnail={thumbnail} />
				<div className="flex flex-col h-[120px] justify-between py-2 min-h-[120px] gap-4">
					<PostDescription title={title} summary={summary} />
					<div className="flex flex-row gap-3 py-3 text-neutral-500">
						<PostMeta date={created_at} />
						<Label>{comments}개의 댓글</Label>
						<div className="flex items-center gap-1">
							<GoHeart />
							{like}
						</div>
					</div>
				</div>
			</Link>
			<Separator />
		</div>
	);
}

const PostDescription = ({ title, summary }: { title: string; summary: string | null | undefined }) => {
	return (
		<div>
			<div className="text-2xl font-bold">{title}</div>
			<div className="text-sm pt-2">{summary}</div>
		</div>
	);
};
