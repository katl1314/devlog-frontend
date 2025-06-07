import Comments from '@/components/Comments/Comments';
import CommentsList from '@/components/Comments/CommentsList';
import { Post } from '@/types/type';
import { createClientByServer } from '@/utils/supabase/server';
import { Comments as TComments } from '@/types/type';

export default async function PostFooter(post: Post) {
	const supabase = await createClientByServer();
	const { data } = await supabase.from('comments').select().eq('path', post.path);

	// Todo userId 수정 필
	return (
		<div className="mt-5 mb-12">
			<div className="font-bold text-lg">{0}개의 댓글</div>
			<Comments {...post} />
			<CommentsList data={data as TComments[]} />
		</div>
	);
}
