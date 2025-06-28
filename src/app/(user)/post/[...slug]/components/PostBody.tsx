import ReactMarkdown from 'react-markdown';
import { IPost, User } from '@/types/type';
import { createClientByServer } from '@/utils/supabase/server';
import UserProfile from '@/app/(user)/user/components/UserProfile';
import Thumbnail from '@/app/(user)/user/components/Thumbnail';
import SideActionBar from './SideActionBar';
import ToC from './ToC';

export default async function PostBody(post: IPost & { user: User }) {
	const supabase = await createClientByServer();
	const profile = await supabase.from('profiles').select().eq('userId', post.userId).single();
	return (
		<div>
			<SideActionBar {...post} />
			<ToC />
			<div id="content__entry_point">
				<Thumbnail thumbnail={post.thumbnail} />
				<ReactMarkdown>{post.content}</ReactMarkdown>
			</div>
			<div className="mt-[256px] mb-12">
				<UserProfile {...profile.data} />
			</div>
		</div>
	);
}
