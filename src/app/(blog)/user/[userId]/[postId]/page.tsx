import PostContextProvider from '@/components/post/post-context-provider';
import { postService } from '@/services/post.service';
import { userService } from '@/services/user.service';
import PostFooter from './components/post-footer';
import PostHeader from './components/post-header';
import PostBody from './components/post-body';
import { notFound } from 'next/navigation';
import { Session } from 'next-auth';
import { isEmpty } from '@/utils';
import { auth } from '@/auth';

// 미리 빌드 시점에 페이지를 생성한다.
export async function generateStaticParams() {
	const data = (await userService.findAll()) as Array<{ posts: any, user_id: string }>;

	return data.flatMap(({ posts, user_id }) => {
		return posts.map((post: any) => {
			const postId = String(post.path).slice(1);
			return { userId: user_id, postId };
		});
	});
}

export default async function Page({ params }: { params: Promise<{ [name: string]: string }> }) {
	const { userId: ownerId, postId } = await params;
	let isLike: boolean = false;
	const session = await auth();
	// 포스트 조회
	const post = await postService.findPost(postId, ownerId);
	// 좋아요 여부 조회
	if (!isEmpty(session)) {
		const { accessToken } = session as Session & { accessToken: string };
		isLike = await postService.findLikeById(postId, accessToken);
	}

	if (!post || post.status === '404') {
		return notFound();
	}

	const likeCount = (post.likes ?? []).length; // 좋아요 개수
	const commentCount = (post.comments ?? []).length; // 댓글 수
	return (
		<PostContextProvider postId={post.id} initIsLiked={isLike} initLikeCount={likeCount} initCommentCount={commentCount}>
			<div className="pb-24 lg:pb-8">
				<PostHeader {...post} />
				<PostBody {...post} />
				<PostFooter {...post} />
			</div>
		</PostContextProvider>
	);
}
