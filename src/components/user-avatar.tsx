import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserAvatarProps {
	src?: string | null;
	userId: string;
	className?: string;
}

export default function UserAvatar({ src, userId, className }: UserAvatarProps) {
	return (
		<Avatar className={className}>
			<AvatarImage src={src || undefined} alt={`${userId}의 프로필 사진`} />
			<AvatarFallback className="font-semibold text-white bg-gradient-to-br from-blue-400 to-purple-500">
				{(userId[0] ?? 'U').toUpperCase()}
			</AvatarFallback>
		</Avatar>
	);
}
