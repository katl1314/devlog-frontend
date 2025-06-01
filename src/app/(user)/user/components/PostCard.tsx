import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import type { Post } from '@/types/type';
import PostMeta from '@/components/PostMeta';
import Thumbnail from './Thumbnail';

export default function PostCard({ thumbnail, path, title, created_at, summary }: Post) {
	return (
		<div className="mb-4">
			<Link href={`./${path}`}>
				<Thumbnail thumbnail={thumbnail} />
				<div className="flex flex-col h-[120px] justify-between py-2 min-h-[120px] gap-4">
					<PostDescription title={title} summary={summary} />
					<PostMeta date={created_at} comments={0} like={0} />
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
