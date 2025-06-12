'use client';

import { Comments } from '@/types/type';
import dynamic from 'next/dynamic';
import CommentSkeleton from '@/components/Skeleton/CommentSkeleton';
import { createContext } from 'react';

const CommentItem = dynamic(() => import('./CommentItem'), {
	ssr: false,
	loading: () => <CommentSkeleton />
});

export const PostContext = createContext<{ userId: string | null | undefined }>({ userId: null });

export default function CommentsList({ data, userId }: { data: Comments[]; userId: string }) {
	return (
		<PostContext.Provider value={{ userId }}>
			<div className="mt-6">
				{data.map(data => (
					<CommentItem key={data.id} {...data} />
				))}
			</div>
		</PostContext.Provider>
	);
}
