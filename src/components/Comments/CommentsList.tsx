'use client';
import { Comments } from '@/types/type';
import dynamic from 'next/dynamic';
import { Skeleton } from '../ui/skeleton';
import { Separator } from '../ui/separator';

const CommentItem = dynamic(() => import('./CommentItem'), {
	ssr: false,
	loading: () => (
		<div className="mt-6">
			<div className="flex flex-row items-center justify-between mb-6">
				<div className="flex flex-row gap-3 items-center">
					<Skeleton className="w-[60px] h-[60px] rounded-full" />
					<div>
						<div className="font-bold mb-2">
							<Skeleton className="w-[100px] h-[20px]" />
						</div>
						<div>
							<Skeleton className="w-[200px] h-[20px]" />
						</div>
					</div>
				</div>
				<div className="flex flex-row items-center gap-2">
					<div>
						<Skeleton className="w-[30px] h-[20px]" />
					</div>
					<div>
						<Skeleton className="w-[30px] h-[20px]" />
					</div>
				</div>
			</div>
			<div className="my-[18px]">
				<Skeleton className="w-full h-[25px]" />
			</div>
			<div className="my-6 flex">
				<Skeleton className="w-[20px] h-[20px]  mr-1" />
				<Skeleton className="w-[50px] h-[20px]" />
			</div>
			<Separator />
		</div>
	)
});

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
