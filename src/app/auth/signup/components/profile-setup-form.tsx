'use client';
import { ChangeEventHandler, useActionState, useEffect, useState } from 'react';
import { formInitialState, ProviderType, RegisterType } from '@/app/schema';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { createUser } from '@/actions/actions';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import { signIn } from 'next-auth/react';
import { GoAlert } from 'react-icons/go';
import { toast } from 'sonner';

import { redirect } from 'next/navigation';

interface User {
	email: string;
	name: string;
	userId: string;
	description: string;
	image: string;
	provider: ProviderType;
}
interface IProfileSetupFormProps {
	user: User;
	provider: ProviderType;
}

export default function ProfileSetupForm({ user, provider }: IProfileSetupFormProps) {
	const [formState, formAction, isPending] = useActionState<
		RegisterType,
		FormData
	>(createUser, formInitialState);

	const [username, setUserName] = useState(user.name);
	const [userId, setUserId] = useState(user.userId || '');
	const [description, setDescription] = useState(user.description);

	const changeUserName: ChangeEventHandler<HTMLInputElement> = event => {
		setUserName(event.target.value);
	};

	const changeUserId: ChangeEventHandler<HTMLInputElement> = event => {
		setUserId(event.target.value);
	};

	const changeDescription: ChangeEventHandler<HTMLTextAreaElement> = event => {
		setDescription(event.target.value);
	};

	useEffect(() => {
		if (formState.errors) {
			// TODO 에러에 대한 처리를 한다.
			toast(JSON.stringify(formState.errors), {
				position: 'top-right',
				duration: 2000,
				icon: <GoAlert />
			});
		}
		else if (formState.userId) {
			(async () => {
				await signIn('credentials', {
					email: formState.email,
					password: 'signup-complete',
					redirect: false,
				});
				redirect('/');
			})();
		}
	}, [formState]);

	return (
		<form action={formAction}>
			<div className="mt-4">
				<Label className="md:text-xl">프로필 이름</Label>
				<Input
					type="text"
					id="username"
					name="username"
					className="bg-white"
					value={username}
					onChange={changeUserName}
					required
				></Input>
			</div>
			<div className="mt-4">
				{/* 이메일 */}
				<Label className="md:text-xl">이메일</Label>
				<Input
					type="text"
					id="email"
					name="email"
					value={user.email}
					readOnly
				></Input>
			</div>
			<div className="mt-4">
				{/* 사용자 ID */}
				<Label className="md:text-xl">사용자 ID</Label>
				<Input
					type="text"
					id="userId"
					name="userId"
					className="bg-white"
					value={userId}
					onChange={changeUserId}
					required
				></Input>
			</div>
			<div className="mt-4">
				{/* 한 줄 소개 */}
				<Label className="md:text-xl">한 줄 소개</Label>
				<Textarea
					id="description"
					name="description"
					className="bg-white"
					value={description}
					onChange={changeDescription}
				></Textarea>
			</div>
			<div className="mt-4">
				<Button type="submit" disabled={isPending}>
					가입
				</Button>
			</div>
			<Input id="provider" name="provider" type="hidden" value={provider}/>
			<Input id="image" name="image" type="hidden" value={user.image}/>
		</form>
	);
}
