import { Skeleton } from '@/components/ui/skeleton';
import Logo from '@/components/common/logo';
import dynamic from 'next/dynamic';
import Image from 'next/image';

interface HeaderProps {
	userId: string | null | undefined;
	title: string;
}

// Profile 컴포넌트 렌더링 동안 Skeleton을 보여준다.
const Profile = dynamic(() => import('@/components/profile/profile'), {
	loading: () => (
		<div className="flex flex-row items-center gap-2 lg:gap-4">
			<Skeleton className="h-8 w-8 rounded-full" />
			<Skeleton className="h-8 w-8 rounded-full" />
			<Skeleton className="h-8 w-8 rounded-full" />
			<Skeleton className="h-8 w-8 rounded-full" />
		</div>
	)
});

export default async function Header({ userId, title }: HeaderProps) {
	return (
		<header>
			<div className="box-border max-h-[70px] mx-auto my-0">
				<div className="flex items-center justify-between p-[10px] gap-3">
					<div className="flex items-center">
						<Logo href="/" className="flex items-center">
							<Image src={'/logo-small.svg'} alt="" width={40} height={40} />
						</Logo>
						<Logo
							href={`/@${userId}`}
							className="text-lg lg:text-xl ml-[12px] flex items-center"
						>
							<span className="font-bold whitespace-nowrap overflow-ellipsis  overflow-hidden w-[110px] lg:w-full">
								{title}
							</span>
						</Logo>
					</div>
					<Profile />
				</div>
			</div>
		</header>
	);
}
