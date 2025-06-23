'use client';

import dynamic from 'next/dynamic';
import AuthForm from '../auth/AuthForm';
import Button from '@/components/common/Button';
import { MouseEventHandler, useState } from 'react';
const CustomModal = dynamic(() => import('../modal/CustomModal'), { ssr: false }); // 지연 로딩

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
			<Button onClick={handleSignUp} value="로그인" />
			{open && (
				<CustomModal afterCloseModal={handleAfterCloseModal} className="lg:w-[35%] lg:mt-[15%]">
					<AuthForm />
				</CustomModal>
			)}
		</>
	);
}
