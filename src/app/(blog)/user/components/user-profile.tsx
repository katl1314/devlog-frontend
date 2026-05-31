import UserAvatar from '@/components/user-avatar';
import Link from 'next/link';
import { userService } from '@/services/user.service';

export default async function UserProfile({ user_id, user_name, avatar_url, blog }: any) {
	const { followerCount, followingCount } = await userService
		.getFollowCounts(user_id)
		.catch(() => ({ followerCount: 0, followingCount: 0 }));

	return (
		<div className="mt-16 rounded-2xl bg-muted/50">
			<div className="flex items-start justify-between gap-4">
				{/* 좌측: 아바타 + 정보 */}
				<div className="flex items-start gap-4 min-w-0">
					<Link href={`/@${user_id}`} className="shrink-0">
						<UserAvatar src={avatar_url} userId={user_id} className="w-16 h-16" />
					</Link>
					<div className="min-w-0">
						<Link href={`/@${user_id}`} className="font-bold text-foreground hover:underline flex align-middle">
							<>{user_name}</>
							<span className="text-sm text-muted-foreground ml-1">@{user_id}</span>
						</Link>
						<div className="flex items-center gap-1.5 mt-1.5 text-xs text-muted-foreground">
							<span>
								팔로워 <strong className="text-foreground font-semibold">{followerCount}</strong>
							</span>
							<span className="text-border">·</span>
							<span>
								팔로잉 <strong className="text-foreground font-semibold">{followingCount}</strong>
							</span>
						</div>
						{blog?.description && (
							<p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">{blog.description}</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
