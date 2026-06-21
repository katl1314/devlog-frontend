'use server';

import { RegisterSchema, RegisterType } from '@/app/schema';
import { userService } from '@/services/user.service';
import { postService } from '@/services/post.service';
import { imageService } from '@/services/image.service';
import { isEmpty, parseFormData, stringToBase64 } from '@/utils';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { auth } from '@/auth';

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

	const password = formData.get('password') ? String(formData.get('password')) : undefined;
	const passwordConfirm = formData.get('passwordConfirm') ? String(formData.get('passwordConfirm')) : undefined;

	if (provider === 'email') {
		if (!password || password.length < 8) {
			return {
				name,
				email,
				userId,
				description,
				provider,
				errors: { password: '비밀번호는 최소 8자 이상이어야 합니다.' }
			};
		}
		if (password !== passwordConfirm) {
			return {
				name,
				email,
				userId,
				description,
				provider,
				errors: { passwordConfirm: '비밀번호가 일치하지 않습니다.' }
			};
		}
	}

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
	const cookieStore = await cookies();
	cookieStore.delete('signup-token');
	return userService.has(email);
};

export const checkWithdrawal = async (email: string): Promise<boolean> => {
	try {
		const user = await userService.findUserByEmail(email);
		const deletedAt = (user as any).deleted_at;
		if (!deletedAt) return false;
		const elapsed = Date.now() - new Date(deletedAt).getTime();
		if (elapsed > 7 * 24 * 60 * 60 * 1000) return false;
		const cookieStore = await cookies();
		cookieStore.set('restore-token', stringToBase64(JSON.stringify({ email: (user as any).email, deletedAt })), {
			httpOnly: true,
			maxAge: 15 * 60,
			path: '/'
		});
		return true;
	} catch {
		return false;
	}
};

export const savePost = async (_: any, formData: FormData) => {
	try {
		const thumbnailRaw = formData.get('thumbnail');
		const isFile = thumbnailRaw instanceof File && thumbnailRaw.size > 0;
		formData.delete('thumbnail');

		const formObj = parseFormData(formData, { tags: 'object' });
		const session = await auth();
		if (!session?.accessToken) throw new Error('Unauthorized');

		const thumbnailUrl = isFile ? await imageService.upload(thumbnailRaw as File, session.accessToken) : '';

		const { id, ...postData } = formObj as { id?: string; [key: string]: unknown };
		const payload = { ...postData, thumbnail: thumbnailUrl };

		const result = id
			? await postService.update(id, payload, session.accessToken)
			: await postService.create(payload, session.accessToken);

		return { status: 'ok', callbackUrl: result.callbackUrl };
	} catch (status: unknown) {
		return { status: (status as Error).message };
	}
};

export const updateSettings = async ({
	name,
	description,
	socials,
	theme,
	comment_notification,
	update_notification,
	avatar_url
}: {
	name: string;
	description: string;
	socials: Record<string, string>;
	theme: string;
	comment_notification: boolean;
	update_notification: boolean;
	avatar_url?: string;
}) => {
	const session = await auth();
	if (!session?.user || !session.accessToken) throw new Error('Unauthorized');

	const userId = session.user.id!;
	await userService.update(
		userId,
		{ user_name: name, blog_description: description, socials, ...(avatar_url ? { avatar_url } : {}) },
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

export const deletePostAction = async (postId?: string) => {
	if (isEmpty(postId)) return;

	try {
		const session = await auth();
		await postService.delete(postId, session?.accessToken);
		revalidatePath('/', 'layout');
	} catch {
		return;
	}
};

export const uploadImage = async (formData: FormData): Promise<string> => {
	const session = await auth();
	if (!session?.accessToken) throw new Error('Unauthorized');

	const file = formData.get('image') as File;
	const key = await imageService.upload(file, session.accessToken);
	return `/api/image/${key}`;
};

export const deleteAccount = async (): Promise<void> => {
	const session = await auth();
	if (!session?.user || !session.accessToken) throw new Error('Unauthorized');

	await userService.withdraw(session.accessToken);
};

export const restoreUser = async (): Promise<{ ok: boolean; message?: string }> => {
	try {
		const cookieStore = await cookies();
		const token = cookieStore.get('restore-token')?.value;
		if (!token) return { ok: false, message: '복구 정보가 없습니다.' };

		await userService.restore(token);
		cookieStore.delete('restore-token');
		return { ok: true };
	} catch {
		return { ok: false, message: '계정 복구에 실패했습니다.' };
	}
};
