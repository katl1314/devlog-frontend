import { Card } from '@/components/ui/card';
import { Separator } from '../ui/separator';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function PostCardSkeleton() {
	return (
		<Card>
			<Skeleton style={{ height: '200px' }} />
			<div className="flex flex-col h-[120px] justify-between py-2">
				<div className="">
					<Skeleton className="w-full h-4" />
					<Skeleton count={2} />
				</div>
				<div className="flex flex-row gap-2">
					<Skeleton style={{ width: '100px' }} />
					<Skeleton style={{ width: '100px' }} />
				</div>
			</div>
			<Separator />
			<div className="py-2">
				<Skeleton style={{ width: '100px' }} />
			</div>
		</Card>
	);
}
