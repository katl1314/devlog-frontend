import Skeleton from 'react-loading-skeleton';
import './skeleton.css';

export default function CardSkeleton() {
	return (
		<div className="px-6 py-5 border-b border-border">
			<div className="flex justify-between items-start gap-4 mb-3">
				<div className="flex-1 min-w-0">
					<Skeleton className="w-32 h-4 mb-2" />
					<Skeleton className="w-full h-5 mb-1" />
					<Skeleton className="w-3/4 h-5 mb-2" />
					<Skeleton className="w-full h-4 mb-1" />
					<Skeleton className="w-2/3 h-4" />
				</div>
				<Skeleton className="w-[88px] h-[88px] rounded-xl shrink-0" />
			</div>
			<div className="flex gap-4">
				<Skeleton className="w-12 h-4" />
				<Skeleton className="w-12 h-4" />
			</div>
		</div>
	);
}
