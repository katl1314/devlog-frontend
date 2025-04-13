import UserLayout from '@/components/Layout/UserLayout';
import { Separator } from '@/components/ui/separator';
import { User } from '@/types/type';
import { createClientByBrowser } from '@/utils/supabase/client';
import { createClientByServer } from '@/utils/supabase/server';
import Image from 'next/image';

export async function generateStaticParams() {
	const supabase = createClientByBrowser();
	const { error, data } = await supabase.from('user').select();
	if (error) throw new Error(error.message);
	const params = data.map(({ userId }) => ({ slug: userId }));
	return params;
}

export const dynamicParams = false;

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
	const supabase = await createClientByServer();
	const userId = (await params).slug;
	const { error, data } = await supabase.from('user').select().eq('userId', userId).single();

	if (error) throw new Error(error.message);

	console.log(data);
	return (
		<main>
			<UserLayout>
				<Profile {...data} />
			</UserLayout>
		</main>
	);
}

function Profile({ userId, username, avatar_url, description }: User) {
	return (
		<>
			<div className="flex flex-row items-center gap-4">
				<div>
					<Image src={avatar_url!} alt={`${userId}의 프로필사진`} width={130} height={130} className="rounded-[50%]" />
				</div>
				<div className="flex flex-col justify-between gap-2">
					<div className="text-3xl font-bold">{username}</div>
					<div className="text-neutral-500">{description}</div>
				</div>
			</div>
			<Separator className="my-[20px]" />
		</>
	);
}
