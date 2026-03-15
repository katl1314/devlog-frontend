import Link from 'next/link';
import { auth } from '@/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MdOutlineAccessTime, MdOutlineTrendingUp } from 'react-icons/md';
import { IoCreateOutline } from 'react-icons/io5';
import { BiBell, BiBookmark, BiUser } from 'react-icons/bi';
import NavbarLogo from './navbar-logo';

const navItems = [
	{ href: '/new', icon: <MdOutlineAccessTime size={22} />, label: '홈 피드' },
	{ href: '/trends', icon: <MdOutlineTrendingUp size={22} />, label: '트렌드' },
	{ href: '#', icon: <BiBell size={22} />, label: '알림센터' },
	{ href: '#', icon: <BiBookmark size={22} />, label: '보관함' }
];

export default async function SidebarNav() {
	const session = await auth();
	const user = session?.user;

	return (
		<nav className="flex flex-col h-screen sticky top-0 overflow-y-auto py-6 px-3 xl:px-5">
			{/* Logo */}
			<Link href="/" className="flex items-center gap-3 mb-8 px-2 xl:px-1">
				{/* 아이콘만 보이는 좁은 사이드바 */}
				<svg
					className="xl:hidden shrink-0"
					width="36"
					height="36"
					viewBox="0 0 32 32"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<defs>
						<linearGradient id="nav-icon-grad" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
							<stop offset="0%" stopColor="#3b82f6" />
							<stop offset="100%" stopColor="#8b5cf6" />
						</linearGradient>
					</defs>
					<rect width="32" height="32" rx="8" fill="url(#nav-icon-grad)" />
					<path d="M19 3L10 17L16 17L12 29L22 15L16 15Z" fill="white" />
				</svg>
				{/* 넓은 사이드바에서 전체 로고 */}
				<div className="hidden xl:block">
					<NavbarLogo />
				</div>
			</Link>

			{/* Nav items */}
			<div className="flex flex-col gap-1 flex-1">
				{navItems.map(item => (
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

			{/* 새 아티클 작성 버튼 */}
			<Link
				href="/write"
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
							<span className="text-sm font-semibold truncate">
								{user.name}
							</span>
							<span className="text-xs text-muted-foreground truncate">
								@{user.id}
							</span>
						</div>
					</div>
				) : (
					<Link
						href="/auth"
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
