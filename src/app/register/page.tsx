import RegistForm from '@/components/RegistForm';
import { createClientByServer } from '@/utils/supabase/server';
import { Metadata } from 'next';

export default async function page() {
	const supabase = await createClientByServer();
	const { data, error } = await supabase.auth.getUser();

	if (error || !data?.user) throw new Error('유효하지 않은 접근입니다.');

	const { email } = data.user;

	return (
		<div>
			<h1 className="text-7xl font-bold">환영합니다!</h1>
			<div className="text-2xl">기본 회원 정보를 등록해주세요.</div>
			<RegistForm email={email} />
		</div>
	);
}

export const metadata: Metadata = { title: '회원가입 - devs.log' };
