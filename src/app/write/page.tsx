import PostEditor from '@/components/Post/PostEditor';
import { redirect} from 'next/navigation';
import { searchUserByEmail } from '@/lib/db';
import { isEmpty } from '@/lib/utils'
import { auth } from '@/auth';

export default async function Page() {
	const session = await auth();

	if (isEmpty(session) || isEmpty(session?.user)) {
		// 세션이 nullish이면 홈으로 리다이렉트한다.
		return redirect('/');
	}

	const user = await searchUserByEmail(session.user.email!);
	return (
		<div className="relative">
			<PostEditor {...user}/>
		</div>
	);
}
