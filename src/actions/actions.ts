'use server';

import { RegisterSchema, RegisterType } from '@/app/schema';
import { userService } from '@/services/user.service';
import { postService } from '@/services/post.service';
import { isEmpty, parseFormData } from '@/utils';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// 서비스 회원가입 액션
export const createUser = async (_state: RegisterType, formData: FormData) => {
	const name = String(formData.get('user_name'));
	const email = String(formData.get('email'));
	const userId = String(formData.get('userId'));
	const provider = String(formData.get('provider'));
	const image = String(formData.get('image'));

	// Blog
	const urlSlug = `/@${userId}`;
	const title = `${userId}.log`;
	const description = String(formData.get('description'));

	const validated = RegisterSchema.safeParse({
		name,
		email,
		userId,
		provider,
		description
	});

	const errors: Record<string, string> = {};

	// 유효성 검사 실패 시...
	if (!validated.success) {
		validated.error.issues.forEach(issue => {
			errors[issue.path[0] as string] = issue.message;
		});

		// 유효성 에러가 있으면 그대로 상태를 리턴 (리다이렉트 X)
		return {
			name,
			email,
			userId,
			description,
			errors,
			provider
		};
	}

	const password = formData.get('password')
		? String(formData.get('password'))
		: undefined;

	const data = {
		user: {
			email: email,
			user_name: name,
			user_id: userId,
			avatar_url: image,
			provider: provider.toUpperCase(),
			...(password ? { password } : {})
		},
		blog: {
			title: title,
			description: description,
			url_slug: urlSlug
		}
	};

	await userService.create(data);

	revalidatePath(`/user/${userId}`);

	return {
		name,
		email,
		userId,
		description,
		provider
	};
};

export const checkEmail = async (email: string): Promise<boolean> => {
	return userService.has(email);
};

export const savePost = async (_: any, formData: FormData) => {
	try {
		const formObj = parseFormData(formData, { tags: 'object' });
		const session = await auth();
		if (!session?.accessToken) throw new Error('Unauthorized');
		// TODO 썸네일 이미지 처리할 것.

		const result = await postService.create(
			{
				...formObj,
				thumbnail: ''
			},
			session.accessToken
		);

		return { status: 'ok', callbackUrl: result.callbackUrl };
	} catch (status: unknown) {
		return { status: (status as Error).message };
	}
};

export const updateSettings = async ({
	name,
	socials,
	theme,
	comment_notification,
	update_notification
}: {
	name: string;
	socials: Record<string, string>;
	theme: string;
	comment_notification: boolean;
	update_notification: boolean;
}) => {
	const session = await auth();
	if (!session?.user || !session.accessToken) throw new Error('Unauthorized');

	const userId = session.user.id!;
	await userService.update(
		userId,
		{ user_name: name, socials },
		session.accessToken
	);
	await userService.updateSettings(
		userId,
		{
			theme: theme.toUpperCase(),
			comment_notification,
			update_notification
		},
		session.accessToken
	);
	revalidatePath('/settings');
};

export const deletePostAction = async (postId?: number) => {
	if (isEmpty(postId)) return;

	try {
		const session = await auth();
		await postService.delete(postId, session?.accessToken);
		revalidatePath('/', 'layout');
	} catch {
		return;
	}
};
