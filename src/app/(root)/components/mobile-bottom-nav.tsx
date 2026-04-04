'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdOutlineAccessTime, MdOutlineTrendingUp } from 'react-icons/md';
import { IoCreateOutline } from 'react-icons/io5';
import { BiUser } from 'react-icons/bi';
import { cn } from '@/utils';
import { useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BiBookmark } from 'react-icons/bi';

const navItems = [
	{
		id: 'home',
		href: '/new',
		icon: MdOutlineAccessTime,
		label: '홈',
		match: ['/', '/new']
	},
	{
		id: 'trend',
		href: '/trends',
		icon: MdOutlineTrendingUp,
		label: '트랜드',
		match: ['/trends']
	},
	{
		id: 'subscribe',
		href: '/subscribe',
		icon: BiBookmark,
		label: '보관함',
		match: []
	},
	{
		id: 'write',
		href: '/write',
		icon: IoCreateOutline,
		label: '글쓰기',
		match: []
	}
];

export default function MobileBottomNav() {
	const pathname = usePathname();
	const { data: session } = useSession();
	const user = session?.user;
	const userId = user?.id ?? ('U' as string);
	return (
		<nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-background/90 backdrop-blur-xl border-t border-border">
			<div className="flex justify-around items-center h-[56px]">
				{navItems.map(({ href, icon: Icon, label, id, match }) => {
					const isActive = match.includes(pathname);
					return (
						<Link
							key={id}
							href={href}
							className={cn(
								'flex flex-col items-center justify-center gap-0.5 flex-1 h-full text-xs transition-colors',
								isActive
									? 'text-foreground'
									: 'text-muted-foreground hover:text-foreground'
							)}
						>
							<Icon size={26} />
							<span className="text-[10px] font-medium">{label}</span>
						</Link>
					);
				})}

				{/* 프로필 탭 */}
				{user ? (
					<button className="flex flex-col items-center justify-center gap-0.5 flex-1 h-full text-xs text-muted-foreground cursor-pointer">
						<Avatar className="w-[30px] h-[30px]">
							<AvatarImage src={user.image ?? ''} />
							<AvatarFallback className="text-gray-300 font-semibold bg-gradient-to-br from-blue-400 to-purple-500">
								{userId[0]?.toUpperCase() ?? 'U'}
							</AvatarFallback>
						</Avatar>
					</button>
				) : (
					<Link
						href={`/auth?callbackUrl=${encodeURIComponent(pathname)}`}
						className="flex flex-col items-center justify-center gap-0.5 flex-1 h-full text-xs text-muted-foreground hover:text-foreground transition-colors"
					>
						<BiUser size={26} />
						<span className="text-[10px] font-medium">프로필</span>
					</Link>
				)}
			</div>
		</nav>
	);
}
