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

		if (post.status === '404') {
			return notFound();
		}

		return (
			<PostContextProvider {...post}>
				<PostHeader {...post} />
				<PostBody {...post} user={post.user} />
				<PostFooter {...post} />
			</PostContextProvider>
		);
	} catch (error: any) {
		throw error;
	}
}