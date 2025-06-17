import Button from '@/components/Button';
import { Separator } from '@/components/ui/separator';
import { User } from '@/types/type';
import { createClientByServer } from '@/utils/supabase/server';
import Image from 'next/image';
import Link from 'next/link';

export default async function UserProfile({ userId, username, avatar_url, description }: User) {
	const supabase = await createClientByServer();
	const { data } = await supabase.auth.getUser();
	const profiles = await supabase.from('profiles').select('id').eq('userId', userId).single();
	const isMyProfile = profiles.data?.id === data.user?.id;

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
				<div>
					{!isMyProfile && (
						<Button value="팔로우" variant="outline" className="py-1 max-h-[32px] rounded-[10px] lg:px-5 lg:py-2" />
					)}
				</div>
			</div>
			<Separator className="mt-[20px]" />
		</>
	);
}
