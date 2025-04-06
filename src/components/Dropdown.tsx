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
import { MouseEventHandler } from 'react';
import { useProfile } from '@/store/profile';

interface Dropdown {
	children: React.ReactNode;
	handleLogOut: MouseEventHandler;
}

export function Dropdown({ children, handleLogOut }: Dropdown) {
	const { username } = useProfile();
	const showSettings = () => {
		window.location.href = `/settings`;
	};

	const showMyPage = (username: string) => {
		window.location.href = `/user/${username}`;
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuGroup>
					<DropdownMenuItem onClick={() => showMyPage(username!)}>
						<User />
						<span>내 블로그</span>
					</DropdownMenuItem>
					<DropdownMenuItem onClick={showSettings}>
						<Settings />
						<span>설정</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleLogOut}>
					<LogOut />
					<span>로그아웃</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
