'use server';

import { ProviderType, RegisterSchema, RegisterType } from '@/app/schema';
import { signIn } from '@/auth';
import { saveUser } from '@/lib/db';

// 회원가입 액션
export const registerUser = async (
	extra: { provider: ProviderType; accountId: string },
	state: RegisterType,
	formData: FormData
): Promise<RegisterType> => {
	const name = String(formData.get('name'));
	const email = String(formData.get('email'));
	const userId = String(formData.get('userId'));
	const description = String(formData.get('description'));
	const provider = extra.provider;
	const accountId = extra.accountId;

	// 유효성 검사
	const validated = RegisterSchema.safeParse({
		name,
		email,
		userId,
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

	// TODO 사용자 DB에 추가
	const result = await saveUser({ name, email, user_id: userId, description });
	console.log('result ----', result);
	await signIn(provider, { redirectTo: '/' });
	return {
		name,
		email,
		userId,
		description,
		errors,
		provider
	};
};

// export const savePost = async (_: unknown, formData: FormData) => {};
// const validateByUser = async (id?: string) => {};
// const saveStorageImage = async (file: File | undefined | null) => {};
// const saveHashTags = async (tags: string[], path: string) => {};
// export const saveComments = async (_: unknown, formData: FormData) => {};
// export const deleteComments = async (id: number) => {};
// export const updateComments = async (_: unknown, formData: FormData) => {};
// export const toggleLike = async (path: string) => {};
