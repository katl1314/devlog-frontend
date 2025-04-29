import { cn } from '@/lib/utils';

export default function TabLayout({
	children,
	className
}: {
	children: React.ReactNode[] | React.ReactNode;
	className?: string;
}) {
	return <div className={cn('flex items-center sticky top-[0] z-[10] bg-[#f5f5f5]', className)}>{children}</div>;
}
