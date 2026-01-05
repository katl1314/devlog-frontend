import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Dropdown } from '../common/Dropdown';
import { searchUserByEmail } from '@/lib/db';
import { Skeleton } from '../ui/skeleton';
import { auth } from '@/auth';
import Link from 'next/link';

export default async function LoginButton() {
	const session = (await auth())!; // 로그인한 사용자 세션
	const image: string = session.user?.image ?? '';
	const email = session.user!.email!;
	const { user_id } = await searchUserByEmail(email);

	return (
		<>
			<Link
				href="/write"
				className="hidden py-2 px-2 lg:flex items-center font-bold border-[1px] rounded-[10px] hover:bg-neutral-200 dark:hover:bg-neutral-700"
			>
				새 글 작성
			</Link>
			<Dropdown userId={user_id}>
				<Avatar className="cursor-pointer">
					<AvatarImage src={image} />
					<AvatarFallback>
						<Skeleton className="h-8 w-8 rounded-full" />
					</AvatarFallback>
				</Avatar>
			</Dropdown>
		</>
	);
}
