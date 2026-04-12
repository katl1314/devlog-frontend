import { userService } from '@/services/user.service';
import PostDetailContent from './components/post-detail-content';

export async function generateStaticParams() {
	try {
		const data = (await userService.findAll()) as Array<{
			posts: any;
			user_id: string;
		}>;

		return data.flatMap(({ posts, user_id }) => {
			return posts.map((post: any) => {
				const postId = String(post.path).slice(1);
				return { userId: user_id, postId };
			});
		});
	} catch {
		return [];
	}
}

export default async function Page({
	params
}: {
	params: Promise<{ [name: string]: string }>;
}) {
	const { userId, postId } = await params;
	return <PostDetailContent postId={postId} userId={userId} />;
}
