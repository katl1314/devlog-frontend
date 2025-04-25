import { CiBellOn, CiSearch } from 'react-icons/ci';
import NotLoginButton from './NotLoginButton';
import LoginButton from './LoginButton';
import { createClientByServer } from '@/utils/supabase/server';
import { sleep } from '@/utils/utils';

export default async function Profile() {
	const supabase = await createClientByServer();
	const { data } = await supabase.auth.getUser();

	await sleep(2000);

	return (
		<div className="flex flex-row items-center gap-2 lg:gap-4">
			{/* 검색 => 모달을 통해서 검색 기능 */}
			<CiSearch size={32} className="block" />
			{/* 구독 알람 => 페이지?*/}
			<CiBellOn size={32} className="cursor-pointer" />
			{!data.user ? <NotLoginButton /> : <LoginButton />}
		</div>
	);
}
