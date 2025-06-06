import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface UserLayout {
	children?: ReactNode[] | ReactNode;
	className?: string;
}

export default function UserLayout({ children, className }: UserLayout) {
	return <div className={cn('lg:pt-16 px-2 xl:px-[200px] 2xl:px-[400px]', className)}>{children}</div>;
}
