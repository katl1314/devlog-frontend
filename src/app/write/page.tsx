import PostEditor from '@/app/write/components/post/post-editor';
import { auth } from '@/auth';
import { postService } from '@/services/post.service';
import { userService } from '@/services/user.service';
import { isEmpty } from '@/utils';

// 접근 권한은 middleware.ts에서 처리한다.

interface IProps {
	searchParams: Promise<{ id: string }>;
}

export default async function Page({ searchParams }: IProps) {
	const { id } = await searchParams;
	const session = (await auth())!;
	let post;
	if (!isEmpty(id)) {
		// 만약 id가 있는 경우 수정으로 간주한다.
		post = await postService.findPostById(id, session.accessToken);
	}

	const user = await userService.findUserById(session.user.id!);
	return (
		<div className="relative">
			<PostEditor user={user} post={post} />
		</div>
	);
}

/**
 *{
 *  id: '931f45fe-4622-42a1-9fcc-de9ee9378ac1',
 *  user_id: 'test',
 *  path: '/1',
 *  title: '테스트',
 *  summary: '11',
 *  content: '<p>ㅌㅌㅌㅌㅌ</p>',
 *  thumbnail: '',
 *  status: 'publish',
 *  visibility: true,
 *  series_id: null,
 *  series_order: null,
 *  created_at: '2026-05-29T06:23:02.802Z',
 *  updated_at: '2026-05-29T06:23:02.802Z',
 *  deleted_at: null
 *}
 **
 */
