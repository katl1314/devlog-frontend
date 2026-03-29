import Link from 'next/link';
import { auth } from '@/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IoCreateOutline } from 'react-icons/io5';
import { BiUser } from 'react-icons/bi';
import { MdOutlineAccessTime } from 'react-icons/md';
import { TbFileText, TbLayoutList, TbUser } from 'react-icons/tb';
import NavbarLogo from '@/app/(root)/components/navbar-logo';

const profileNavItems = (userId: string) => [
	{ href: `/user/${userId}`, icon: <TbFileText size={22} />, label: '포스트' },
	{ href: `/user/${userId}?tab=series`, icon: <TbLayoutList size={22} />, label: '시리즈' },
	{ href: `/user/${userId}?tab=about`, icon: <TbUser size={22} />, label: '소개' },
];

export default async function UserSidebarNav({ userId }: { userId: string }) {
	const session = await auth();
	const user = session?.user;

	return (
		<nav className="flex flex-col h-screen sticky top-0 overflow-y-auto py-6 px-3 xl:px-5">
			{/* Logo */}
			<Link href="/" className="flex items-center gap-3 mb-8 px-2 xl:px-1">
				<svg
					className="xl:hidden shrink-0"
					width="36"
					height="36"
					viewBox="0 0 32 32"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<defs>
						<linearGradient id="user-nav-grad" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
							<stop offset="0%" stopColor="#3b82f6" />
							<stop offset="100%" stopColor="#8b5cf6" />
						</linearGradient>
					</defs>
					<rect width="32" height="32" rx="8" fill="url(#user-nav-grad)" />
					<path d="M19 3L10 17L16 17L12 29L22 15L16 15Z" fill="white" />
				</svg>
				<div className="hidden xl:block">
					<NavbarLogo />
				</div>
			</Link>

			{/* 홈 피드로 */}
			<Link
				href="/new"
				className="flex items-center gap-4 px-3 py-3 mb-2 rounded-2xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors font-medium group"
			>
				<span className="flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
					<MdOutlineAccessTime size={22} />
				</span>
				<span className="hidden xl:block text-[15px]">홈 피드</span>
			</Link>

			{/* 구분선 */}
			<div className="border-t border-border mx-2 mb-3" />

			{/* 프로필 네비 */}
			<p className="hidden xl:block text-xs text-muted-foreground font-semibold px-3 mb-2 uppercase tracking-wider">
				프로필
			</p>
			<div className="flex flex-col gap-1 flex-1">
				{profileNavItems(userId).map(item => (
					<Link
						key={item.label}
						href={item.href}
						className="flex items-center gap-4 px-3 py-3 rounded-2xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors font-medium group"
					>
						<span className="flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
							{item.icon}
						</span>
						<span className="hidden xl:block text-[15px]">{item.label}</span>
					</Link>
				))}
			</div>

			{/* 새 아티클 작성 */}
			<Link
				href={user ? '/write' : '/auth'}
				className="mt-4 flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-foreground text-background text-sm font-bold hover:opacity-85 transition-opacity shadow-sm"
			>
				<IoCreateOutline size={18} />
				<span className="hidden xl:block">새 아티클 작성</span>
			</Link>

			{/* 유저 프로필 */}
			<div className="mt-3">
				{user ? (
					<div className="flex items-center gap-3 p-2 rounded-full cursor-pointer hover:bg-muted/50 transition-colors">
						<Avatar className="w-10 h-10 shrink-0">
							<AvatarImage src={user.image ?? ''} />
							<AvatarFallback className="text-sm font-semibold">
								{user.name?.[0]?.toUpperCase() ?? 'U'}
							</AvatarFallback>
						</Avatar>
						<div className="hidden xl:flex flex-col overflow-hidden flex-1 min-w-0">
							<span className="text-sm font-semibold truncate">{user.name}</span>
							<span className="text-xs text-muted-foreground truncate">@{user.id}</span>
						</div>
					</div>
				) : (
					<Link
						href={`/auth?callbackUrl=${encodeURIComponent(`/user/${userId}`)}`}
						className="flex items-center justify-center gap-2 py-3 px-4 rounded-full border border-border text-sm font-medium hover:bg-muted/50 transition-colors"
					>
						<BiUser size={20} />
						<span className="hidden xl:block">로그인</span>
					</Link>
				)}
			</div>
		</nav>
	);
}
