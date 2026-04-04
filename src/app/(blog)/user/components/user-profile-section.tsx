import Image from 'next/image';
import { FaGithub, FaHome } from 'react-icons/fa';

export default function UserProfileSection({
	user_id,
	user_name,
	avatar_url,
	blog
}: any) {
	const avatarInitial = (user_id?.[0] ?? 'U').toUpperCase();

	return (
		<div className="px-4 pt-8 pb-5">
			{/* 아바타 + 이름 */}
			<div className="flex items-center gap-5 mb-5">
				<div className="relative w-20 h-20 lg:w-24 lg:h-24 shrink-0">
					{avatar_url ? (
						<Image
							src={avatar_url}
							alt={`${user_id}의 프로필사진`}
							fill
							className="rounded-full object-cover"
						/>
					) : (
						<div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
							{avatarInitial}
						</div>
					)}
				</div>
				<div className="flex flex-col gap-1">
					<span className="text-xl font-bold leading-tight">{user_name}</span>
					<span className="text-sm text-muted-foreground">@{user_id}</span>
					{blog?.description && (
						<span className="text-sm text-muted-foreground">
							{blog.description}
						</span>
					)}
				</div>
			</div>

			{/* 소셜 아이콘 + 팔로워/팔로잉 */}
			{/* <div className="flex items-center justify-between">
				<div className="flex items-center gap-3 text-muted-foreground">
					<FaGithub size={22} />
					<FaHome size={22} />
				</div>
				<div className="flex items-center gap-4 text-sm text-muted-foreground">
					<span>
						<strong className="text-foreground font-semibold">0</strong> 팔로워
					</span>
					<span>
						<strong className="text-foreground font-semibold">0</strong> 팔로잉
					</span>
				</div>
			</div> */}
		</div>
	);
}
