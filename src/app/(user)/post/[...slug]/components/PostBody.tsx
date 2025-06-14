import ReactMarkdown from 'react-markdown';
import { Post } from '@/types/type';
import { createClientByServer } from '@/utils/supabase/server';
import UserProfile from '@/app/(user)/user/components/UserProfile';
import Thumbnail from '@/app/(user)/user/components/Thumbnail';
import SideActionBar from './SideActionBar';

export default async function PostBody({ content, userId, thumbnail, path }: Post) {
	const supabase = await createClientByServer();
	const { data } = await supabase.auth.getUser();
	const id = data.user?.id ?? '';
	const profile = await supabase.from('profiles').select().eq('userId', userId).single();
	const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/posts?postId=${path}&authId=${id}`);

	if (!res.ok) {
		throw new Error();
	}

	const post = await res.json();
	return (
		<div>
			<SideActionBar {...post.data[0]} />
			<div>
				<Thumbnail thumbnail={thumbnail} />
				<ReactMarkdown>{content}</ReactMarkdown>
			</div>
			<div className="mt-[256px] mb-12">
				<UserProfile {...profile.data} />
			</div>
		</div>
	);
}
