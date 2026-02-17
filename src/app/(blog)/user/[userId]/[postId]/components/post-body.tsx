import UserProfile from '@/app/(blog)/user/components/user-profile';
import Thumbnail from '@/app/(blog)/user/components/thumbnail';
import ReactMarkdown from 'react-markdown';
import SideBar from './sidebar';
import Toc from './toc';

export default function PostBody(post: any) {
	return (
		<div className="flex relative">
			<SideBar />
			<main id="content__entry_point" className="flex-1 w-full min-w-0">
				<Thumbnail thumbnail={post.thumbnail} />
				<ReactMarkdown>{post.content}</ReactMarkdown>
				<UserProfile {...post.user} />
			</main>
			<Toc />
		</div>
	);
}