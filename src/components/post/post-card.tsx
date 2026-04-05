import { GoHeart, GoComment, GoLock } from 'react-icons/go';
import PostMeta from '@/components/post/post-meta';
import { Label } from '../ui/label';
import Image from 'next/image';
import Link from 'next/link';
import UserAvatar from '@/components/user-avatar';

export default function PostCard({
	path,
	title,
	created_at,
	thumbnail,
	summary,
	comments,
	user,
	likes,
	visibility
}: any) {
	const blogPath = user.blog.url_slug;
	const postPath = `${blogPath}${path}`;

	return (
		<article className="px-4 py-4 hover:bg-muted/30 transition-colors border-b border-border last:border-b-0">
			{/* 작성자 & 작성시간 & 비공개글... */}
			<div className="flex items-center gap-2 mb-3">
				<Link href={blogPath} className="shrink-0 hover:opacity-80 transition-opacity">
					<UserAvatar src={user.avatar_url} userId={user.user_id} className="w-6 h-6" />
				</Link>
				<Link
					href={blogPath}
					className="text-sm font-semibold text-foreground hover:underline leading-none"
				>
					{user.user_id}
				</Link>
				<Label className="text-muted-foreground text-sm">·</Label>
				<PostMeta date={created_at} className="text-sm text-muted-foreground" />
				{!visibility && <GoLock size={16} fill={'gray'} />}
			</div>

			{/* 본문 */}
			<Link href={postPath} className="block group">
				<div className="flex justify-between items-start gap-4">
					{/* 텍스트 */}
					<div className="flex-1 min-w-0">
						<h3 className="text-[17px] font-bold leading-snug text-foreground mb-1.5 line-clamp-2 tracking-tight group-hover:text-blue-500 transition-colors">
							{title}
						</h3>
						<p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
							{summary}
						</p>
					</div>
					{/* 썸네일 */}
					{thumbnail && (
						<div className="relative w-[88px] h-[88px] shrink-0 rounded-xl overflow-hidden">
							<Image
								src={thumbnail}
								alt={title}
								fill
								className="object-cover"
							/>
						</div>
					)}
				</div>

				{/* 푸터 */}
				<div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
					<div className="flex items-center gap-1.5 hover:text-rose-500 transition-colors">
						<GoHeart size={15} />
						<span>{likes.length}</span>
					</div>
					<div className="flex items-center gap-1.5 hover:text-blue-500 transition-colors">
						<GoComment size={15} />
						<span>{comments.length}</span>
					</div>
				</div>
			</Link>
		</article>
	);
}
