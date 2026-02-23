import PostContextProvider from '@/components/post/post-context-provider';
import { userService } from '@/services/user.service';
import PostFooter from './components/post-footer';
import PostHeader from './components/post-header';
import PostBody from './components/post-body';
import { notFound } from 'next/navigation';
import { postService } from '@/services/post.service';

// 미리 빌드 시점에 페이지를 생성한다.
export async function generateStaticParams() {
	const data = (await userService.findAll()) as Array<{blog: any, posts: any}>;
	return data.map(({blog, posts}) => {
		const blogSlug = blog.url_slug;
		return posts.map((post: any) => {
			return { slug: [blogSlug, post.path]}
		});
	})
}

export default async function Page({ params }: { params: Promise<{ [name: string]: string }> }) {
	try {
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
	} catch (error: any) {
		throw error;
	}
}

// <div className="max-w-3xl mx-auto px-4 pb-24 lg:pb-8 pt-8">
