import Link from 'next/link';
import Image from 'next/image';
import PostMeta from '@/components/post/post-meta';
import { GoHeart, GoComment } from 'react-icons/go';

export default function PostCard({
	path,
	title,
	created_at,
	thumbnail,
	summary,
	comments,
	user,
	likes
}: any) {
	const blogPath = user.blog.url_slug;
	const postPath = `${blogPath}${path}`;
	const avatarInitial = (user.user_id?.[0] ?? 'U').toUpperCase();

	return (
		<article className="px-4 py-4 hover:bg-muted/30 transition-colors border-b border-border last:border-b-0">
			{/* 작성자 메타 */}
			<div className="flex items-center gap-2 mb-3">
				<Link
					href={blogPath}
					className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0 hover:opacity-80 transition-opacity"
				>
					{avatarInitial}
				</Link>
				<Link
					href={blogPath}
					className="text-sm font-semibold text-foreground hover:underline leading-none"
				>
					{user.user_id}
				</Link>
				<span className="text-muted-foreground text-sm">·</span>
				<PostMeta date={created_at} className="text-sm text-muted-foreground" />
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
