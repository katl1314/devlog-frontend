'use client';
import { MouseEventHandler, useState } from 'react';
import { CiBellOn, CiSearch } from 'react-icons/ci';
import { Button } from './ui/button';
import dynamic from 'next/dynamic';
import AuthForm from './AuthForm';
import { useProfile } from '@/store/profile';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Dropdown } from './Dropdown';
import { createClient } from '@/utils/supabase/client';

const AuthModal = dynamic(() => import('./Modal/AuthModal'), { ssr: false }); // 지연 로딩

export default function Profile() {
	const [open, setOpen] = useState(false);
	const { logout } = useProfile();
	const handleSignUp: MouseEventHandler = () => {
		setOpen(true);
	};

	const handleAfterCloseModal = () => {
		setOpen(prevState => !prevState);
	};

	const handleLogout = () => {
		// 로그아웃
		const supabase = createClient();
		supabase.auth.signOut().then(() => {
			logout();
			window.location.reload();
		});
	};

	const { isLoggedIn, avatar_url } = useProfile();
	return (
		<div className="flex flex-row gap-4 items-center">
			{/* 검색 => 모달을 통해서 검색 기능 */}
			<CiSearch size={32} className="block lg:hidden" />
			{/* 구독 알람 => 페이지?*/}
			<CiBellOn size={32} className="cursor-pointer" />
			{!isLoggedIn ? (
				<>
					<Button className="flex items-center font-bold cursor-pointer" onClick={handleSignUp}>
						로그인
					</Button>
					{open && (
						<AuthModal afterCloseModal={handleAfterCloseModal}>
							<AuthForm />
						</AuthModal>
					)}
				</>
			) : (
				<>
					<Dropdown handleLogOut={handleLogout}>
						<Avatar className="cursor-pointer">
							<AvatarImage src={avatar_url ?? 'https://github.com/shadcn.png'} />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
					</Dropdown>
				</>
			)}
		</div>
	);
}
/* 

*/
