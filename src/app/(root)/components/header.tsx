import { Skeleton } from '@/components/ui/skeleton';
import Logo from '@/components/common/logo';
import NavbarLogo from './navbar-logo';
import dynamic from 'next/dynamic';

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

export default async function Header() {
	return (
		<header className="md:hidden border-b border-border">
			<div className="box-border max-h-[70px] mx-auto my-0">
				<div className="flex items-center justify-between px-4 py-[10px]">
					<h3 className="flex cursor-pointer">
						<Logo href="/">
							<NavbarLogo />
						</Logo>
					</h3>
					<Profile />
				</div>
			</div>
		</header>
	);
}
