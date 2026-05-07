'use client';

import InfiniteList from '@/components/infinite-list';
import PostCard from '@/components/post/post-card';
import { postService } from '@/services/post.service';
import { useSession } from 'next-auth/react';
import { FiFileText } from 'react-icons/fi';

interface PostListProps {
	userId?: string;
}

export default function PostList({ userId }: PostListProps) {
	const { data: session } = useSession();
	const accessToken = session?.accessToken;

	const queryKey = ['posts', userId ?? 'all', accessToken ? 'auth' : 'anon'];

	const queryFn = ({ pageParam = 0 }: { pageParam?: unknown }) => {
		const cursor = pageParam as number;
		const request = userId
			? postService.getListByUser(userId, cursor, accessToken)
			: postService.getList(cursor, accessToken);

		return request.then(res => ({
			posts: res.data,
			nextCursor: res.cursor.after
		}));
	};

	return (
		<InfiniteList queryKey={queryKey} queryFn={queryFn}>
			<InfiniteList.Item render={(post) => <PostCard {...post} />} />
			<InfiniteList.Empty>
				<div className="flex flex-col items-center justify-center w-full py-24 text-center">
					<div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-5">
						<FiFileText size={28} className="text-muted-foreground" />
					</div>
					<p className="text-base font-semibold text-foreground">아직 작성된 포스트가 없습니다</p>
					<p className="mt-1.5 text-sm text-muted-foreground">첫 포스트를 작성해 생각을 공유해보세요</p>
				</div>
			</InfiniteList.Empty>
		</InfiniteList>
	);
}
