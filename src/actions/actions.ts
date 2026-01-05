'use server';

import { RegisterSchema, RegisterType } from '@/app/schema';
import { saveBlog, saveUser } from '@/lib/db';

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

export const savePost = async (state: any, formData: FormData,) => {
  try {
    // TODO 트랜잭션 처리 추가필요
    // const supabase = await createClientByServer();
    // const auth = await supabase.auth.getUser();
    // let user;

    // 포스트 등록에 유효한 사용자인지 확인한다.
    // if ((user = await validateByUser(auth.data.user?.id))) {
    //   const { title, content, visibility, file, path, summary, tags } = parseFormData(formData, { tags: 'object' });
    //
    //   // 만약 중복된 path가 있으면 에러를 반환해야한다.
    //   const { data } = await supabase.from('posts').select().eq('path', path);
    //
    //   if (data?.length ?? 0 > 0) {
    //     return { status: 'ERROR', message: '이미 존재하는 URL입니다.' };
    //   }
    //
    //   // 만약 포스트에 썸네일 이미지가 있는경우 storage에 등록한다.
    //   const uploadImage = await saveStorageImage(file as File);
    //   const post = {
    //     title,
    //     content,
    //     path,
    //     summary,
    //     auth_cd: visibility,
    //     thumbnail: uploadImage?.path,
    //     userId: user.userId
    //   };
    //
    //   await supabase.from('posts').insert(post);
    //
    //   if (!tags) return { status: 'OK' };
    //
    //   if (!(await saveHashTags(tags as string[], path as string))) {
    //     throw new Error('태그 등록 중 에러가 발생하였습니다.');
    //   }
    // }

    return { status: 'OK' };
  } catch (err: unknown) {
    return { message: (err as Error).message, status: 'ERROR' };
  }
}