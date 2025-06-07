import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface IUserLayout {
	children?: ReactNode[] | ReactNode;
	className?: string;
}

export default function UserLayout({ children, className }: IUserLayout) {
	return <div className={cn('lg:mt-16 px-2 xl:px-[200px] 2xl:px-[400px]', className)}>{children}</div>;
}
