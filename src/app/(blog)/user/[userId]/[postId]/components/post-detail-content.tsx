import PostContextProvider from './post-context-provider';
import { postService } from '@/services/post.service';
import { notFound } from 'next/navigation';
import PostHeader from './post-header';
import PostFooter from './post-footer';
import { Session } from 'next-auth';
import PostBody from './post-body';
import { isEmpty } from '@/utils';
import { auth } from '@/auth';

interface PostDetailContentProps {
	postId: string;
	userId: string;
}

export default async function PostDetailContent({
	postId,
	userId
}: PostDetailContentProps) {
	const session = await auth();
	const accessToken = (session as Session & { accessToken?: string })
		?.accessToken;

	let post: any;
	try {
		post = await postService.findPost(postId, userId, accessToken);
	} catch {
		return notFound();
	}

	const isLike = !isEmpty(session)
		? ((await postService.findLikeById(post.id, accessToken!))?.isLiked ??
			false)
		: false;

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
