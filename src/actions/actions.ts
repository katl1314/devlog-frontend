'use server';

import { RegisterSchema, RegisterType } from '@/app/schema';
import { createAccount, createPost } from '@/lib/db';
import { parseFormData } from '@/lib/utils';


// 서비스 회원가입 액션
export const createUser = async (
  state: RegisterType,
  formData: FormData,
) => {
    const name = String(formData.get('username'));
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

    const data = {
      user: {
        email: email,
        user_name: name,
        user_id: userId,
        avatar_url: image,
      },
      blog: {
        title: title,
        description: description,
        url_slug: urlSlug,
      }
    }

    await createAccount(data);

    return {
      name,
      email,
      userId,
      description,
      provider,
    };
};

export const savePost = async (_: any, formData: FormData) => {
  try {
    const formObj = parseFormData(formData, { tags: 'object' });
    // TODO 썸네일 이미지 저장

    await createPost({
      body: {
        ...formObj,
        thumbnail: '',
      }
    });

  } catch (err: unknown) {
    return { status: 'ERROR', message: (err as Error).message };
  }
}