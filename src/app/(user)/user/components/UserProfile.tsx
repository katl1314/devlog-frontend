import { Separator } from '@/components/ui/separator';
import { User } from '@/types/type';
import Image from 'next/image';

export default function UserProfile({ userId, username, avatar_url, description }: User) {
	return (
		<>
			<div className="flex flex-row items-center gap-4">
				<div className="w-[80px] h-[80px] lg:w-[130px] lg:h-[130px] relative">
					<Image src={avatar_url!} alt={`${userId}의 프로필사진`} fill className="rounded-[50%]" />
				</div>
				<div className="flex flex-col justify-between gap-3">
					<div className="text-xl lg:text-3xl font-bold">{username}</div>
					<div className="lg:text-xl text-neutral-500">{description}</div>
				</div>
			</div>
			<Separator className="mt-[20px]" />
		</>
	);
}
