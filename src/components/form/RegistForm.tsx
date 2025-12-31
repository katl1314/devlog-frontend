'use client';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { createUser } from '@/actions/actions';
import { formInitialState, ProviderType, RegisterType } from '@/app/schema';
import { ChangeEventHandler, useActionState, useEffect, useState } from 'react';

interface User {
	email: string;
	name: string;
	userId: string;
	description: string;
	image: string;
	provider: ProviderType;
}
interface IRegistForm {
	user: User;
	provider: ProviderType;
	accountId: string;
}

export default function RegistForm({ user, provider, accountId }: IRegistForm) {
	const createUserAction = createUser.bind(null, {
		provider,
		accountId,
		image: user.image
	});
	const [formState, formAction, isPending] = useActionState<
		RegisterType,
		FormData
	>(createUserAction, formInitialState);
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
			alert(JSON.stringify(formState.errors));
		}
	}, [formState]);

	return (
		<form action={formAction}>
			<div className="mt-4">
				{/* 프로필 이름 */}
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
		</form>
	);
}
