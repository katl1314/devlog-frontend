'use client';
import { ChangeEventHandler, useActionState, useEffect, useState } from 'react';
import { formInitialState, ProviderType, RegisterType } from '@/app/schema';
import { createUser } from '@/actions/actions';
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

const inputCls =
	'w-full border border-border bg-transparent rounded-md px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors disabled:opacity-50';

const labelCls =
	'block text-xs font-medium text-foreground mb-1.5 tracking-wide';

const LoadingSpinner = () => (
	<svg
		className="animate-spin h-4 w-4"
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
	>
		<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
		<path
			className="opacity-75"
			fill="currentColor"
			d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
		/>
	</svg>
);

export default function ProfileSetupForm({ user, provider }: IProfileSetupFormProps) {
	const isEmailSignup = provider === 'email' && !user.email;

	const [formState, formAction, isPending] = useActionState<RegisterType, FormData>(
		createUser,
		formInitialState
	);

	const [username, setUserName] = useState(user.name);
	const [userId, setUserId] = useState(user.userId || '');
	const [description, setDescription] = useState(user.description);

	const changeUserName: ChangeEventHandler<HTMLInputElement> = e => setUserName(e.target.value);
	const changeUserId: ChangeEventHandler<HTMLInputElement> = e => setUserId(e.target.value);
	const changeDescription: ChangeEventHandler<HTMLTextAreaElement> = e => setDescription(e.target.value);

	useEffect(() => {
		if (formState.errors) {
			toast(JSON.stringify(formState.errors), {
				position: 'top-right',
				duration: 2000,
				icon: <GoAlert />
			});
		} else if (formState.userId) {
			(async () => {
				await signIn('signup-complete', {
					email: formState.email,
					redirect: false
				});
				redirect('/');
			})();
		}
	}, [formState]);

	return (
		<form action={formAction} className="space-y-3.5">
			{isEmailSignup ? (
				<>
					<div>
						<label className={labelCls}>이메일</label>
						<input
							type="email"
							name="email"
							required
							placeholder="example@email.com"
							className={inputCls}
						/>
					</div>
					<div>
						<label className={labelCls}>비밀번호</label>
						<input
							type="password"
							name="password"
							required
							placeholder="••••••••"
							className={inputCls}
						/>
					</div>
				</>
			) : (
				<div>
					<label className={labelCls}>이메일</label>
					<input
						type="text"
						name="email"
						value={user.email}
						readOnly
						className={inputCls}
					/>
				</div>
			)}

			<div>
				<label className={labelCls}>프로필 이름</label>
				<input
					type="text"
					name="user_name"
					required
					placeholder="닉네임"
					value={username}
					onChange={changeUserName}
					className={inputCls}
				/>
			</div>

			<div>
				<label className={labelCls}>사용자 ID</label>
				<input
					type="text"
					name="userId"
					required
					maxLength={20}
					placeholder="영문/숫자, 20자 이내"
					value={userId}
					onChange={changeUserId}
					className={inputCls}
				/>
			</div>

			<div>
				<label className={labelCls}>
					한 줄 소개{' '}
					<span className="text-muted-foreground font-normal">(선택)</span>
				</label>
				<textarea
					name="description"
					placeholder="간단한 자기소개"
					value={description}
					onChange={changeDescription}
					rows={3}
					className={`${inputCls} resize-none`}
				/>
			</div>

			<input type="hidden" name="provider" value={provider} />
			<input type="hidden" name="image" value={user.image} />

			<button
				type="submit"
				disabled={isPending}
				className="w-full flex items-center justify-center gap-2 bg-foreground text-background rounded-md py-2.5 text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity cursor-pointer"
			>
				{isPending && <LoadingSpinner />}
				{isPending ? '처리 중...' : '가입하기'}
			</button>
		</form>
	);
}
