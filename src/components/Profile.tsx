'use client';
import { MouseEventHandler, useState } from 'react';
import { CiBellOn, CiSearch } from 'react-icons/ci';
import { Button } from './ui/button';
import dynamic from 'next/dynamic';
import SignInForm from './SignInForm';

const Modal = dynamic(() => import('./Modal/Modal'), { ssr: false }); // 지연 로딩

export default function Profile() {
	const [open, setOpen] = useState(false);
	const handleSignUp: MouseEventHandler = () => {
		setOpen(true);
	};

	const handleAfterCloseModal = () => {
		setOpen(prevState => !prevState);
	};
	return (
		<div className="flex flex-row gap-2 items-center">
			{/* 검색 => 모달을 통해서 검색 기능 */}
			<CiSearch size={32} className="block lg:hidden" />
			{/* 구독 알람 => 페이지?*/}
			<CiBellOn size={32} className="cursor-pointer" />
			<Button className="flex items-center font-bold cursor-pointer" onClick={handleSignUp}>
				로그인
			</Button>
			{open && (
				<Modal afterCloseModal={handleAfterCloseModal}>
					<SignInForm />
				</Modal>
			)}
		</div>
	);
}
/* 
<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar> 
*/
