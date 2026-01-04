'use server';

import { RegisterSchema, RegisterType } from '@/app/schema';
import { saveBlog, saveUser } from '@/lib/db';

// 서비스 회원가입 액션
export const createUser = async (
  state: RegisterType,
  formData: FormData,
) => {
    // User
    const name = String(formData.get('username'));
    const email = String(formData.get('email'));
    const userId = String(formData.get('userId'));
    const provider = String(formData.get('provider'));
    const image = String(formData.get('image'));

    // Blog
    const title = `${userId}`;
    const description = String(formData.get('description'));
    const urlSlug = `/@${userId}`;

    const validated = RegisterSchema.safeParse({
      name,
      email,
      userId,
      provider,
      description,
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
        provider,
      };
    }

    const user = await saveUser({
      email,
      user_name: name,
      user_id: userId,
      avatar_url: image,
    });

    await saveBlog({
      user,
      title,
      description,
      url_slug: urlSlug,
    })

    return {
      name,
      email,
      userId,
      description,
      provider,
    };
};