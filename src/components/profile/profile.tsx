import { CiBellOn, CiSearch } from 'react-icons/ci';
import ThemeToggle from '../theme/theme-toggle';
import NotLoginButton from './not-login-button';
import LoginButton from './login-button';
import { auth } from '@/auth';

export default async function Profile() {
	const session = await auth(); // 로그인한 사용자 세션
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
			{session ? <LoginButton /> : <NotLoginButton />}
		</div>
	);
}
