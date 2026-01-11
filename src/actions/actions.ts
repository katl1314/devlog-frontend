'use server';

import { RegisterSchema, RegisterType } from '@/app/schema';
import { parseFormData } from '@/lib/utils';
import { createAccount } from '@/lib/db';
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

    await createAccount(data);

    return {
      name,
      email,
      userId,
      description,
      provider,
    };
};

// TODO 포스트 등록
export const savePost = async (state: any, formData: FormData,) => {
  try {
    const user = await auth();
    console.log('user ----', user);

    // TODO user 유효성 체크

    const formObj = parseFormData(formData, { tags: 'object' });
    console.log('formObj ----', formObj);

    // TODO 썸네일 이미지 추가

    // 만약 중복된 path가 있으면 에러를 반환해야한다.
    // const { data } = await supabase.from('posts').select().eq('path', path);
    //
    // if (data?.length ?? 0 > 0) {
    //   return { status: 'ERROR', message: '이미 존재하는 URL입니다.' };
    // }
    //
    // // 만약 포스트에 썸네일 이미지가 있는경우 storage에 등록한다.
    // const uploadImage = await saveStorageImage(file as File);
    // const post = {
    //   title,
    //   content,
    //   path,
    //   summary,
    //   auth_cd: visibility,
    //   thumbnail: uploadImage?.path,
    //   userId: user.userId
    // };
    //
    // await supabase.from('posts').insert(post);
    //
    // if (!tags) return { status: 'OK' };
    //
    // if (!(await saveHashTags(tags as string[], path as string))) {
    //   throw new Error('태그 등록 중 에러가 발생하였습니다.');
    // }

    return { status: 'ERROR', message: '춘잣 두두두' };
  } catch (err: unknown) {
    return { message: (err as Error).message, status: 'ERROR' };
  }
}