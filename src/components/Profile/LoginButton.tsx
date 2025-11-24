import { Dropdown } from '../common/Dropdown';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Link from 'next/link';
import { Skeleton } from '../ui/skeleton';

export default async function LoginButton() {
	return (
		<>
			<Link
				href="/write"
				className="hidden py-2 px-2 lg:flex items-center font-bold border-[1px] rounded-[10px] hover:bg-neutral-200 dark:hover:bg-neutral-700"
			>
				새 글 작성
			</Link>
			<Dropdown>
				<Avatar className="cursor-pointer">
					{/* <AvatarImage src={avatar_url} /> */}
					<AvatarFallback>
						<Skeleton className="h-8 w-8 rounded-full" />
					</AvatarFallback>
				</Avatar>
			</Dropdown>
		</>
	);
}
