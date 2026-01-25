import ProfileSetupForm from './components/profile-setup-form';
import { base64ToString } from '@/utils';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { Metadata } from 'next';

export default async function page() {
	const cookie = await cookies();
	const token = cookie.get('signup-token')?.value ?? '';

	if (!token) {
		redirect('/');
	}
	const encodeToken: string = base64ToString(token);
	const data = JSON.parse(encodeToken);
	return (
		<>
			<h1 className="text-5xl md:text-7xl font-bold">환영합니다!</h1>
			<div className="text-xl md:text-5xl mt-3">
				기본 회원 정보를 등록해주세요.
			</div>
			<ProfileSetupForm {...data} />
		</>
	);
}

export const metadata: Metadata = { title: '회원가입 - devs.log' };
