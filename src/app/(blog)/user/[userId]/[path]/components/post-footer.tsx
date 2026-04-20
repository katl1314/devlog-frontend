'use client';

import { PostContext } from './post-context-provider';
import CommentModule from '@/components/comment';
import { useCallback, useContext } from 'react';

interface PostFooterProps {
	id: number;
	comments: any[];
}

export default function PostFooter({ id, comments }: PostFooterProps) {
	const { setCommentCount } = useContext(PostContext);

	const handleCountChange = useCallback(
		(count: number) => {
			setCommentCount(count);
		},
		[setCommentCount]
	);
	return (
		<div className="mt-5 mb-12" id="comments">
			<CommentModule
				postId={id}
				initialComments={comments}
				onCountChange={handleCountChange}
			>
				<CommentModule.Count className="mb-4" />
				<CommentModule.Form className="mb-6" />
				<CommentModule.List />
			</CommentModule>
		</div>
	);
}
