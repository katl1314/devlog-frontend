import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface IUserLayout {
	children?: ReactNode[] | ReactNode;
	className?: string;
}

export default function UserLayout({ children, className }: IUserLayout) {
	return <div className={cn('mt-16 px-2 xl:px-[200px] 2xl:px-[420px]', className)}>{children}</div>;
}
