import RegistForm from '@/components/form/RegistForm';
import { Metadata } from 'next';

export default async function page() {
	return (
		<>
			<h1 className="text-5xl md:text-7xl font-bold">환영합니다!</h1>
			<div className="text-xl md:text-5xl mt-3">
				기본 회원 정보를 등록해주세요.
			</div>
			<RegistForm email={'nogoso3@gmail.com'} />
		</>
	);
}

export const metadata: Metadata = { title: '회원가입 - devs.log' };
