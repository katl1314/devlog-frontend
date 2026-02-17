import Link from 'next/link';
import PostMeta from '@/components/post/post-meta';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardTitle
} from '@/components/ui/card';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { GoHeart, GoComment } from 'react-icons/go';
import PostCardHeader from '@/components/post/post-card-header';

export default function PostCard({
	path,
	title,
	created_at,
	thumbnail,
	summary,
	comments,
	user,
	like
}: any) {
	const blogPath = user.blog.url_slug;
	const postPath = `${blogPath}${path}`;
	return (
		<Card>
			<Link href={postPath}>
				<PostCardHeader thumbnail={thumbnail!}>
					<CardTitle>{title}</CardTitle>
					<CardDescription className="pt-2 line-clamp-4 text-ellipsis">
						{summary}
					</CardDescription>
				</PostCardHeader>
				<CardContent className="flex flex-col h-[120px] justify-end px-2">
					<div className="flex flex-row gap-3 py-3 text-neutral-500">
						<PostMeta date={created_at} />
						<div className="flex items-center gap-1">
							<GoComment />
							{comments}
						</div>
						<div className="flex items-center gap-1">
							<GoHeart />
							{like}
						</div>
					</div>
				</CardContent>
			</Link>
			<Separator />
			<CardFooter className="flex justify-between py-3">
				<Label>
					<Link href={blogPath}>{user.user_id}</Link>
				</Label>
			</CardFooter>
		</Card>
	);
}


