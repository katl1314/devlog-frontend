import { CiBellOn, CiSearch } from 'react-icons/ci';
import NotLoginButton from './NotLoginButton';
import LoginButton from './LoginButton';
import { createClientByServer } from '@/utils/supabase/server';
import ThemeToggle from '../theme/ThemeToggle';

export default async function Profile() {
	const supabase = await createClientByServer();
	const { data } = await supabase.auth.getUser();

	return (
		<div className="flex flex-row items-center gap-2 lg:gap-4">
			<ThemeToggle />
			{/* 검색 => 모달을 통해서 검색 기능 */}
			<CiSearch
				size={38}
				className="cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-full block p-1"
			/>
			{/* 구독 알람 => 페이지?*/}
			<CiBellOn
				size={38}
				className="cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-full block p-1"
			/>
			{data.user ? <LoginButton /> : <NotLoginButton />}
		</div>
	);
}
