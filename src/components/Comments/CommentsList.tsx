import { Comments } from '@/types/type';
import { CommentItem } from './CommentItem';

export default function CommentsList({ data }: { data: Comments[] }) {
	// 먼저 루트 댓글만 보여준다.
	return (
		<div className="mt-6">
			{data.map(data => (
				<CommentItem key={data.id} {...data} />
			))}
		</div>
	);
}
