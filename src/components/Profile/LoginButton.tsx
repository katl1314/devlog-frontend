import { createClientByServer } from '@/utils/supabase/server';
import { Dropdown } from '../Dropdown';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Link from 'next/link';
import { Skeleton } from '../ui/skeleton';

export default async function LoginButton() {
	const supabase = await createClientByServer();
	const {
		data: { user }
	} = await supabase.auth.getUser();

	if (!user) return;

	const {
		user_metadata: { avatar_url }
	} = user;

	return (
		<>
			<Link
				href="/write"
				prefetch={false}
				className="hidden md:flex items-center font-bold cursor-pointer border-[1px] border-b-[#e5e5e5] rounded-[10px] py-[5px] px-2 hover:bg-black hover:text-[#fff] hover:border-transparent"
			>
				새 글 작성
			</Link>
			<Dropdown>
				<Avatar className="cursor-pointer">
					<AvatarImage src={avatar_url} />
					<AvatarFallback>
						<Skeleton className="h-8 w-8 rounded-full" />
					</AvatarFallback>
				</Avatar>
			</Dropdown>
		</>
	);
}
