'use client';
import { Label } from '@radix-ui/react-label';
import { Input } from './ui/input';
import { registUser } from '@/actions/actions';
import { Button } from './ui/button';
import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';

interface IRegistForm {
	email: string;
	username: string;
	userId: string;
	content: string;
}

export default function RegistForm({ email }: Partial<IRegistForm>) {
	const [, formAction, isPending] = useActionState(registUser, null);
	const searchParams = useSearchParams();
	const code = searchParams.get('code') ?? '';

	return (
		<form action={formAction}>
			<div className="mt-4">
				{/* 프로필 이름 */}
				<Label className="md:text-xl">프로필 이름</Label>
				<Input type="text" id="username" name="username" className="bg-white" required></Input>
			</div>
			<div className="mt-4">
				{/* 이메일 */}
				<Label className="md:text-xl">이메일</Label>
				<Input type="text" id="email" name="email" value={email} readOnly></Input>
			</div>
			<div className="mt-4">
				{/* 사용자 ID */}
				<Label className="md:text-xl">사용자 ID</Label>
				<Input type="text" id="userId" name="userId" className="bg-white" required></Input>
			</div>
			<div className="mt-4">
				{/* 한 줄 소개 */}
				<Label className="md:text-xl">한 줄 소개</Label>
				<Input type="text" id="content" name="content" className="bg-white"></Input>
			</div>
			<div className="mt-4">
				<Button type="submit" disabled={isPending}>
					가입
				</Button>
			</div>
			<input type="hidden" name="code" id="code" value={code} />
		</form>
	);
}
