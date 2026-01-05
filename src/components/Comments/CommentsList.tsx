import { Comments } from '@/types/type';
import dynamic from 'next/dynamic';
import CommentSkeleton from '@/components/skeleton/CommentSkeleton';

const CommentItem = dynamic(() => import('./CommentItem'), {
	loading: () => <CommentSkeleton />
});

export default function CommentsList({ data, onSuccess }: { data: Comments[]; onSuccess?: () => void }) {
	return (
		<div className="mt-6">
			{data.map(data => (
				<CommentItem key={data.id} onSuccess={onSuccess} {...data} />
			))}
		</div>
	);
}
