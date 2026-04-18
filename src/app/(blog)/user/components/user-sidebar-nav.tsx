import SidebarUserMenu, {
	SignedIn,
	SignedOut,
	SignOnUserMenu,
	NotSignOnUserMenu
} from '@/app/(root)/components/sidebar-user-menu';
import SidebarNavItems from '@/app/(root)/components/sidebar-nav-items';
import { TbFileText, TbLayoutList, TbUser } from 'react-icons/tb';
import NavbarLogo from '@/app/(root)/components/navbar-logo';
import { Separator } from '@/components/ui/separator';
import { MdOutlineAccessTime } from 'react-icons/md';
import { IoCreateOutline } from 'react-icons/io5';
import { auth } from '@/auth';
import Link from 'next/link';

const profileNavItems = (userId: string) => [
	{
		href: `/@${userId}`,
		icon: <TbFileText size={22} />,
		label: '포스트',
		match: [`/@${userId}`, `/user/${userId}`]
	},
	{
		href: `/@${userId}?tab=series`,
		icon: <TbLayoutList size={22} />,
		label: '시리즈',
		match: []
	},
	{
		href: `/@${userId}?tab=about`,
		icon: <TbUser size={22} />,
		label: '소개',
		match: []
	}
];

export default async function UserSidebarNav({ userId }: { userId: string }) {
	const session = await auth();
	const user = session?.user;

	return (
		<nav className="flex flex-col h-screen sticky top-0 overflow-y-auto py-6 px-3 xl:px-5">
			<Link href="/" className="flex items-center gap-3 mb-8 px-2 xl:px-1">
				<NavbarLogo />
			</Link>

			<Link
				href="/new"
				className="flex items-center gap-4 px-3 py-3 mb-2 rounded-2xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors font-medium group"
			>
				<span className="flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
					<MdOutlineAccessTime size={22} />
				</span>
				<span className="hidden xl:block text-[15px]">홈 피드</span>
			</Link>

			<Separator className="mb-3" />

			<SidebarNavItems items={profileNavItems(userId)} />

			<div className="mt-4">
				<Link
					href={user ? '/write' : '/auth'}
					className="flex items-center justify-center gap-2 xl:py-3 xl:px-4 rounded-full text-sm mx-auto xl:mx-0 w-10 h-10 xl:w-auto xl:h-auto  bg-foreground text-background font-bold hover:opacity-85 transition-opacity shadow-sm"
				>
					<IoCreateOutline size={18} />
					<span className="hidden xl:block">새 포스트 작성</span>
				</Link>
			</div>

			{/* 유저 프로필 */}
			<div className="mt-3">
				<SidebarUserMenu isSignedIn={!!user?.id}>
					<SignedIn>
						<SignOnUserMenu
							image={user?.image}
							id={user?.id}
							name={user?.name}
						/>
					</SignedIn>
					<SignedOut>
						<NotSignOnUserMenu />
					</SignedOut>
				</SidebarUserMenu>
			</div>
		</nav>
	);
}
