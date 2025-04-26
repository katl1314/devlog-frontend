'use client';
import { useProfile } from '@/store/profile';
import { Dropdown } from '../Dropdown';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { createClientByBrowser } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';

export default function LoginButton() {
	const { logout, avatar_url } = useProfile();
	const supabase = createClientByBrowser();
	const handleLogout = () => {
		// 로그아웃
		supabase.auth.signOut().then(() => {
			logout();
			window.location.reload();
		});
	};

	const handleWrite = () => {
		redirect('/write');
	};

	return (
		<>
			<Button className="flex items-center font-bold cursor-pointer border-b" variant={'outline'} onClick={handleWrite}>
				새 글 작성
			</Button>
			<Dropdown handleLogOut={handleLogout}>
				<Avatar className="cursor-pointer">
					<AvatarImage src={avatar_url ?? 'https://github.com/shadcn.png'} />
					<AvatarFallback />
				</Avatar>
			</Dropdown>
		</>
	);
}
