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
import { signOut } from 'next-auth/react';
import Link from 'next/link';
interface IDropdown {
	userId: string;
	children: React.ReactNode;
}

export function Dropdown({ userId, children }: IDropdown) {
	const handleSignOut = () => {
		signOut();
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<Link
							href={`/@${userId}`}
							className="flex justify-start items-center gap-3"
						>
							<User />
							<span>내 블로그</span>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem className="block lg:hidden">
						<Link
							href="/write"
							className="flex justify-start items-center gap-3"
						>
							<User />
							<span>새 글 작성</span>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Link
							href="/settings"
							className="flex justify-start items-center gap-3"
						>
							<Settings />
							<span>설정</span>
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleSignOut}>
					<LogOut />
					<span>로그아웃</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
