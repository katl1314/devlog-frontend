'use client';

import { redirect } from 'next/navigation';
import { MouseEventHandler } from 'react';
import { Button } from '../ui/button';

export default function NotLoginButton() {
	const handleSignUp: MouseEventHandler = () => {
		redirect('/auth');
	};

	return (
		<Button
			variant="secondary"
			onClick={handleSignUp}
			className="px-5 py-0 font-bold cursor-pointer"
		>
			로그인
		</Button>
	);
}
