import ReactMarkdown from 'react-markdown';
import { Post } from '@/types/type';
import { createClientByBrowser } from '@/utils/supabase/client';
import UserProfile from '@/app/(user)/user/components/UserProfile';
import Thumbnail from '@/app/(user)/user/components/Thumbnail';
import SideActionBar from './SideActionBar';

export default async function PostBody({ content, userId, thumbnail }: Post) {
	const supabase = await createClientByBrowser();
	const { data } = await supabase.from('profiles').select().eq('userId', userId).single();

	return (
		<div>
			<SideActionBar />
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
