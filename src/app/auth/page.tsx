'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const handleSignInGoogle = async () => {
	await signIn('google', {
		redirect: true,
		redirectTo: '/'
	});
};

export default function Page() {
	return (
		<div className="my-0 mx-auto min-h-[250px]">
			<div className="px-2 py-2">
				<Label className="text-lg font-bold text-center">로그인</Label>
			</div>

			<div className="p-6 flex justify-center">
				<Label className="text-lg lg:text-2xl text-center">
					Dev.log에서 많은 개발자와 공유하세요!
				</Label>
			</div>

			<div className="p-8">
				<Label className="text-lg font-bold text-center text-neutral-400">
					소셜 계정으로 로그인하기
				</Label>
				<div className="flex flex-col gap-4 mt-3">
					<Button
						type="submit"
						className="bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none"
						onClick={handleSignInGoogle}
					>
						구글 계정으로 로그인
					</Button>
					<Button
						type="submit"
						size="lg"
						className="bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:outline-none"
					>
						깃허브 계정으로 로그인
					</Button>
				</div>
			</div>
		</div>
	);
}
