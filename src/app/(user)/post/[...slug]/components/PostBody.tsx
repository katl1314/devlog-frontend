import ReactMarkdown from 'react-markdown';
import { Post } from '@/types/type';
import { createClientByBrowser } from '@/utils/supabase/client';
import UserProfile from '@/app/(user)/user/components/UserProfile';
import Thumbnail from '@/app/(user)/user/components/Thumbnail';
import SideActionBar from './SideActionBar';

export default async function PostBody({ content, userId, thumbnail, path }: Post) {
	const supabase = await createClientByBrowser();
	const { data } = await supabase.from('profiles').select().eq('userId', userId).single();
	const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/posts?postId=${path}`);

	if (!res.ok) {
		throw new Error();
	}

	const { data: post } = await res.json();
	return (
		<div>
			<SideActionBar {...post[0]} />
			<div>
				<Thumbnail thumbnail={thumbnail} />
				<ReactMarkdown>{content}</ReactMarkdown>
			</div>
			<div className="mt-[256px] mb-12">
				<UserProfile {...data} />
			</div>
		</div>
	);
}
