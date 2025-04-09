'use client';
import { Label } from '@radix-ui/react-label';
import { Input } from './ui/input';
import { registUser } from '@/actions/actions';
import { Button } from './ui/button';
import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';

interface RegistForm {
	email: string;
	username: string;
	userId: string;
	content: string;
}

export default function RegistForm({ email }: Partial<RegistForm>) {
	const [, formAction, isPending] = useActionState(registUser, null);
	const searchParams = useSearchParams();
	const code = searchParams.get('code') ?? '';

	return (
		<form action={formAction}>
			<div>
				{/* 프로필 이름 */}
				<Label className="text-xl">프로필 이름</Label>
				<Input type="text" id="username" name="username"></Input>
			</div>
			<div>
				{/* 이메일 */}
				<Label className="text-xl">이메일</Label>
				<Input type="text" id="email" name="email" value={email} readOnly></Input>
			</div>
			<div>
				{/* 사용자 ID */}
				<Label className="text-xl">사용자 ID</Label>
				<Input type="text" id="userId" name="userId"></Input>
			</div>
			<div>
				{/* 한 줄 소개 */}
				<Label className="text-xl">한 줄 소개</Label>
				<Input type="text" id="content" name="content"></Input>
			</div>
			<div>
				<Button type="submit" disabled={isPending}>
					가입
				</Button>
			</div>
			<input type="hidden" name="code" id="code" value={code} />
		</form>
	);
}
