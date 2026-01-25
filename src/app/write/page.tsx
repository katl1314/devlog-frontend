import PostEditor from '@/components/Post/PostEditor';
import { redirect} from 'next/navigation';
import { isEmpty } from '@/utils'
import { auth } from '@/auth';
import { userService } from '@/services/user.service';

export default async function Page() {
	const session = await auth();

	if (isEmpty(session) || isEmpty(session?.user)) {
		return redirect('/');
	}

	const user = await userService.findUserById(session.user.id!);
	return (
		<div className="relative">
			<PostEditor {...user}/>
		</div>
	);
}
