import PostContextProvider from './post-context-provider';
import { postService } from '@/services/post.service';
import { notFound } from 'next/navigation';
import { apiClient } from '@/utils/db';
import PostHeader from './post-header';
import PostFooter from './post-footer';
import PostBody from './post-body';
import Thumbnail from '@/app/(blog)/user/components/thumbnail';
import { isEmpty } from '@/utils';
import { auth } from '@/auth';

interface PostDetailContentProps {
	path: string;
	userId: string;
	isModal?: boolean;
}

export default async function PostDetailContent({ path, userId, isModal = false }: PostDetailContentProps) {
	const session = await auth();
	const accessToken = session?.accessToken;

	let post: any;
	let comments: any[];

	try {
		post = await postService.findPost({ userId, path }, accessToken);
		comments = await apiClient(`/comment/${post.id}`);
	} catch {
		return notFound();
	}

	const isLike = !isEmpty(session)
		? ((await postService.findLikeById(post.id, accessToken!))?.isLiked ?? false)
		: false;

	return (
		<PostContextProvider
			postId={post.id}
			userId={userId}
			path={path}
			isModal={isModal}
			initIsLiked={isLike}
			initLikeCount={(post.likes ?? []).length}
			initCommentCount={(post.comments ?? []).length}
		>
			<div className="pb-24 lg:pb-8">
				<Thumbnail
					thumbnail={post.thumbnail}
					title={post.title}
					tags={post.tags}
					user={post.user}
					created_at={post.created_at}
				/>
				<PostHeader {...post} isModal={isModal} hasThumbnail={!!post.thumbnail} />
				<PostBody {...post} />
				<PostFooter {...post} comments={comments} />
			</div>
		</PostContextProvider>
	);
}
