import { Separator } from '@/components/ui/separator';
import { User } from '@/types/type';
import Image from 'next/image';
import Link from 'next/link';

export default async function UserProfile({ userId, username, avatar_url, description }: User) {
	return (
		<>
			<div className="flex flex-row justify-between items-center">
				<div className="flex flex-row items-center gap-4">
					<div className="w-[80px] h-[80px] lg:w-[128px] lg:h-[128px] relative">
						<Link href={`/@${userId}`}>
							<Image src={avatar_url!} alt={`${userId}의 프로필사진`} fill className="rounded-[50%]" />
						</Link>
					</div>
					<div className="flex flex-col justify-between gap-3">
						<Link href={`/@${userId}`}>
							<div className="text-xl lg:text-3xl font-bold hover:underline">{username}</div>
						</Link>
						<div className="lg:text-xl text-neutral-500">{description}</div>
					</div>
				</div>
			</div>
			<Separator className="mt-[20px]" />
		</>
	);
}
