import PostEditor from '@/app/write/components/post/post-editor';
import { auth } from '@/auth';
import { userService } from '@/services/user.service';

// 접근 권한은 middleware.ts에서 처리한다.
export default async function Page() {
	const session = (await auth())!;
	const user = await userService.findUserById(session.user.id!);
	return (
		<div className="relative">
			<PostEditor {...user} />
		</div>
	);
}
