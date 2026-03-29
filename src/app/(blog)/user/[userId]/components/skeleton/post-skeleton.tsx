import { Separator } from '@/components/ui/separator';
import Skeleton from 'react-loading-skeleton';
import '@/components/skeleton/skeleton.css';

export default function PostSkeleton() {
	return (
		<div className="mb-4">
			<Skeleton className="h-[200px]" />
			<div className="flex flex-col h-[120px] justify-between py-2">
				<div className="">
					<Skeleton className="w-full h-4 mb-2" />
					<Skeleton count={2} />
				</div>
				<div className="flex flex-row gap-2">
					<Skeleton style={{ width: '100px' }} />
					<Skeleton style={{ width: '100px' }} />
					<Skeleton style={{ width: '100px' }} />
				</div>
			</div>
			<Separator />
		</div>
	);
}
