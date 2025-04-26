'use client';
import { LogOut, Settings, User } from 'lucide-react';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useProfile } from '@/store/profile';
import Link from 'next/link';
import { createClientByBrowser } from '@/utils/supabase/client';

interface Dropdown {
	children: React.ReactNode;
}

export function Dropdown({ children }: Dropdown) {
	const { userId, logout } = useProfile();
	const supabase = createClientByBrowser();
	const handleLogout = () => {
		// 로그아웃
		supabase.auth.signOut().then(() => {
			logout();
			window.location.reload();
		});
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<Link href={`/@${userId}`} className="flex justify-start items-center gap-3">
							<User />
							<span>내 블로그</span>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Link href={`/settings`} className="flex justify-start items-center gap-3">
							<Settings />
							<span>설정</span>
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleLogout}>
					<LogOut />
					<span>로그아웃</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
