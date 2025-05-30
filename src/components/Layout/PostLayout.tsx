import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface PostLayout {
	children?: ReactNode[] | ReactNode;
	className?: string;
}

export default function PostLayout({ children, className }: PostLayout) {
	return <div className={cn('px-2 xl:px-[400px]', className)}>{children}</div>;
}
