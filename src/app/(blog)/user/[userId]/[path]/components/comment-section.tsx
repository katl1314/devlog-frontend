'use client';

import CommentModule, { CommentTree } from '@/components/comment';

interface CommentSectionProps {
	postId: number;
	initialComments: CommentTree[];
}

export default function CommentSection({ postId, initialComments }: CommentSectionProps) {
	return (
		<CommentModule postId={postId} initialComments={initialComments}>
			<CommentModule.Count className="mb-4" />
			<CommentModule.Form className="mb-6" />
			<CommentModule.List />
		</CommentModule>
	);
}
