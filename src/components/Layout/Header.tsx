import Logo from '@/components/Logo';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Skeleton } from '../ui/skeleton';

// Profile 컴포넌트 렌더링 동안 Skeleton을 보여준다.
const Profile = dynamic(() => import('@/components/Profile/Profile'), {
	loading: () => (
		<div className="flex flex-row items-center gap-2 lg:gap-4">
			<Skeleton className="h-8 w-8 rounded-full" />
			<Skeleton className="h-8 w-8 rounded-full" />
			<Skeleton className="h-8 w-8 rounded-full" />
			<Skeleton className="h-8 w-8 rounded-full" />
		</div>
	)
});

export default async function Header() {
	return (
		<header>
			<div className="box-border max-h-[70px] mx-auto my-0">
				<div className="flex items-center justify-between p-[10px]">
					<h3 className="flex cursor-pointer">
						<Logo href="/">
							<Image src={'/logo.svg'} alt="" width={150} height={100} />
						</Logo>
					</h3>
					<Profile />
				</div>
			</div>
		</header>
	);
}
