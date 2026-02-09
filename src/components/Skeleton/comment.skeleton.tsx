import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

export default function CommentSkeleton() {
	return (<div className="mt-6">
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
	</div>);
}