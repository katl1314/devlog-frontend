import { Separator } from '@/components/ui/separator';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function PostCardSkeleton() {
	return (
		<div>
			<Skeleton style={{ height: '400px' }} />
			<div className="flex flex-row gap-2">
				<Skeleton style={{ width: '100px' }} />
				<Skeleton style={{ width: '100px' }} />
			</div>
			<div className="py-2">
				<Skeleton style={{ width: '30px' }} />
				<Skeleton style={{ width: '50px' }} />
				<Skeleton style={{ width: '30px' }} />
			</div>
			<Separator />
		</div>
	);
}
