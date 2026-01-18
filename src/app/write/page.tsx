import PostEditor from '@/components/Post/PostEditor';
import { redirect} from 'next/navigation';
import { searchUser } from '@/lib/db';
import { isEmpty } from '@/lib/utils'
import { auth } from '@/auth';

export default async function Page() {
	const session = await auth();

	if (isEmpty(session) || isEmpty(session?.user)) {
		return redirect('/');
	}

	const user = await searchUser(session.user.id!);
	return (
		<div className="relative">
			<PostEditor {...user}/>
		</div>
	);
}
