import PostContextProvider from '@/components/post/post-context-provider';
import { postService } from '@/services/post.service';
import { userService } from '@/services/user.service';
import PostFooter from './components/post-footer';
import PostHeader from './components/post-header';
import PostBody from './components/post-body';
import { notFound } from 'next/navigation';

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
	const { userId, postId } = await params;
	const post = await postService.findPost(userId, postId);

	if (!post || post.status === '404') {
		return notFound();
	}

	const likeCount = (post.likes ?? []).length; // 좋아요 개수
	const commentCount = (post.comments ?? []).length; // 댓글 수
	return (
		<PostContextProvider postId={post.id} initIsLiked={false} initLikeCount={likeCount} initCommentCount={commentCount}>
			<div className="pb-24 lg:pb-8">
				<PostHeader {...post} />
				<PostBody {...post} />
				<PostFooter {...post} />
			</div>
		</PostContextProvider>
	);
}
