'use client';

import CommentModule from '@/components/comment';

interface PostFooterProps {
	id: number;
	comments: any[];
}

export default function PostFooter({ id, comments }: PostFooterProps) {
	return (
		<div className="mt-5 mb-12" id="comments">
			<CommentModule postId={id} initialComments={comments}>
				<CommentModule.Count className="mb-4" />
				<CommentModule.Form className="mb-6" />
				<CommentModule.List />
			</CommentModule>
		</div>
	);
}
