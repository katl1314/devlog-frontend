import Comments from '@/components/comment/Comments';
import CommentsList from '@/components/comment/CommentsList';
import { Comments as TComments, Post } from '@/types/type';

export default async function PostFooter(post: Post) {
	return (
		<div className="mt-5 mb-12" id="comments">
			<div className="font-bold text-lg mb-4">{0}개의 댓글</div>
			<Comments {...post} />
			<CommentsList data={[] as TComments[]} />
		</div>
	);
}
