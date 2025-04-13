import UserLayout from '@/components/Layout/UserLayout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { User } from '@/types/type';
import { createClientByBrowser } from '@/utils/supabase/client';
import { createClientByServer } from '@/utils/supabase/server';
import Image from 'next/image';
import { FaGithub, FaHome } from 'react-icons/fa';

export async function generateStaticParams() {
	const supabase = createClientByBrowser();
	const { error, data } = await supabase.from('profiles').select();
	if (error) throw new Error(error.message);
	const params = data.map(({ userId }) => ({ slug: userId }));
	return params;
}

export const dynamicParams = false;

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
	const supabase = await createClientByServer();
	const userId = (await params).slug;
	const { error, data } = await supabase.from('profiles').select().eq('userId', userId).single();

	if (error) throw new Error(error.message);

	return (
		<main>
			<UserLayout>
				<UserProfile {...data} />
				<Separator className="my-[20px]" />
				<UserProfileBottom />
			</UserLayout>
		</main>
	);
}

function UserProfile({ userId, username, avatar_url, description }: User) {
	return (
		<>
			<div className="flex flex-row items-center gap-4">
				<div>
					<Image src={avatar_url!} alt={`${userId}의 프로필사진`} width={130} height={130} className="rounded-[50%]" />
				</div>
				<div className="flex flex-col justify-between gap-3">
					<div className="text-3xl font-bold">{username}</div>
					<div className="text-xl text-neutral-500">{description}</div>
				</div>
			</div>
		</>
	);
}

function UserProfileBottom() {
	return (
		<div>
			<FollowInfo />
			<FollowButton />
		</div>
	);
}

function FollowInfo() {
	return (
		<div className="flex flex-row justify-end gap-4 text-lg">
			<div>
				<span className="font-bold">0</span> 팔로워
			</div>
			<div>
				<span className="font-bold">0</span> 팔로잉
			</div>
		</div>
	);
}

function FollowButton() {
	return (
		<div className="flex flex-row justify-between mt-6 items-center">
			<div className="flex flex-row gap-3">
				<FaGithub size={35} fill="gray" />
				<FaHome size={35} fill="gray" />
			</div>
			<div>
				{/* 팔로잉 */}
				<Button type="button" className="text-lg">
					팔로잉
				</Button>
			</div>
		</div>
	);
}
