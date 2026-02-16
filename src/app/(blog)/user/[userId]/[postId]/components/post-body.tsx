import UserProfile from '@/app/(blog)/user/components/UserProfile';
import Thumbnail from '@/app/(blog)/user/components/Thumbnail';
import SideActionBar from './SideActionBar';
import ReactMarkdown from 'react-markdown';
import { IPost, User } from '@/types/type';
import ToC from './ToC';

export default async function PostBody(post: IPost & { user: User }) {
	return (
		<div>
			<SideActionBar {...post} />
			<ToC />
			<div id="content__entry_point">
				<Thumbnail thumbnail={post.thumbnail} />
				<ReactMarkdown>{post.content}</ReactMarkdown>
			</div>
			<div className="mt-[256px] mb-12">
				<UserProfile {...post.user} />
			</div>
		</div>
	);
}
