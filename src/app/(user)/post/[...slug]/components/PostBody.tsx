import ReactMarkdown from 'react-markdown';
import { Post } from '@/types/type';
import { createClientByBrowser } from '@/utils/supabase/client';
import UserProfile from '@/app/(user)/user/components/UserProfile';
import SideActionBar from './SideActionBar';

export default async function PostBody({ content, userId }: Post) {
	const supabase = await createClientByBrowser();
	const { data } = await supabase.from('profiles').select().eq('userId', userId).single();
	return (
		<div className="mb-6">
			<SideActionBar />
			<div className="my-16">
				<ReactMarkdown>{content}</ReactMarkdown>
			</div>
			<div className="mt-[300px] mb-12">
				<UserProfile {...data} />
			</div>
		</div>
	);
}
