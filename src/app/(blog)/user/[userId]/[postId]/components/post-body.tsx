import UserProfile from '@/app/(blog)/user/components/user-profile';
import Thumbnail from '@/app/(blog)/user/components/thumbnail';
import ReactMarkdown from 'react-markdown';
import { IPost, User } from '@/types/type';
import SideBar from './sidebar';
import Toc from './toc';

export default async function PostBody(post: IPost & { user: User }) {
	return (
		<div>
			<SideBar {...post} />
			<Toc />
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
