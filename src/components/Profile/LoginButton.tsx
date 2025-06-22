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
		data: { avatar_url }
	} = await supabase.from('profiles').select().eq('id', user.id).limit(1).single();

	return (
		<>
			<Link
				href="/write"
				className="hidden py-2 px-2 lg:flex items-center font-bold border-[1px] rounded-[10px] hover:bg-black hover:text-[#fff]"
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
