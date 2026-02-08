'use server';

import { RegisterSchema, RegisterType } from '@/app/schema';
import { userService } from '@/services/user.service';
import { postService } from '@/services/post.service';
import { parseFormData } from '@/utils';
import { Session } from 'next-auth';
import { auth } from '@/auth';

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

    await userService.create(data);

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
    const session = (await auth()) as Session & { accessToken: string };
    // TODO 썸네일 이미지 처리할 것.

    await postService.create({
      ...formObj,
      thumbnail: '',
    }, session.accessToken);

    return { status: 'ok' };

  } catch (status: unknown) {
    return { status: (status as Error).message };
  }
}

export const saveComment = async(_: any, formData: FormData) => {
  console.log(formData);
  return { message: '', status: '' }
}