import PostContextProvider from './post-context-provider';
import PostHeader from './post-header';
import PostBody from './post-body';
import PostFooter from './post-footer';
import { auth } from '@/auth';
import { isEmpty } from '@/utils';
import { Session } from 'next-auth';
import { postService } from '@/services/post.service';
import { notFound } from 'next/navigation';

interface PostDetailContentProps {
	postId: string;
	userId: string;
}

export default async function PostDetailContent({
	postId,
	userId
}: PostDetailContentProps) {
	let isLike: boolean = false;
	const [session, post] = await Promise.all([
		auth(),
		postService.findPost(postId, userId)
	]);

	if (!post || post.status === '404') {
		return notFound();
	}

	if (!isEmpty(session)) {
		const { accessToken } = session as Session & { accessToken: string };
		isLike = await postService.findLikeById(post.id, accessToken);
	}

	return (
		<PostContextProvider
			postId={post.id}
			initIsLiked={isLike}
			initLikeCount={(post.likes ?? []).length}
			initCommentCount={(post.comments ?? []).length}
		>
			<div className="pb-24 lg:pb-8">
				<PostHeader {...post} />
				<PostBody {...post} />
				<PostFooter {...post} />
			</div>
		</PostContextProvider>
	);
}
