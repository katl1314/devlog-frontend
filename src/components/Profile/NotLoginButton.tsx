'use client';

import dynamic from 'next/dynamic';
import AuthForm from '../AuthForm';
import { Button } from '../ui/button';
import { MouseEventHandler, useState } from 'react';
const CustomModal = dynamic(() => import('../Modal/CustomModal'), { ssr: false }); // 지연 로딩

export default function NotLoginButton() {
	const [open, setOpen] = useState(false);

	const handleSignUp: MouseEventHandler = () => {
		setOpen(true);
	};

	const handleAfterCloseModal = () => {
		setOpen(prevState => !prevState);
	};

	return (
		<>
			<Button className="flex items-center font-bold cursor-pointer" onClick={handleSignUp}>
				로그인
			</Button>
			{open && (
				<CustomModal afterCloseModal={handleAfterCloseModal} className="lg:w-[35%] lg:mt-[15%]">
					<AuthForm />
				</CustomModal>
			)}
		</>
	);
}
