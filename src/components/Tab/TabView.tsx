import { cn } from '@/utils/utils';

export default function TabView({
	children,
	showOption = false,
	position = 'start',
	gap = 0
}: {
	children: React.ReactNode[] | React.ReactNode;
	showOption?: boolean;
	gap?: number;
	position?: 'start' | 'end';
}) {
	// 특정 조건일때만 Select를 보여줘야한다.

	const flexPosition: Record<'start' | 'end', string> = {
		start: 'justify-start',
		end: 'justify-end'
	};

	const flexGap: Record<number, string> = {
		0: 'gap-0',
		1: 'gap-1',
		2: 'gap-2',
		3: 'gap-3',
		4: 'gap-4'
	};

	const justifyStart = position != 'start' && `${flexPosition[position]} flex-auto`;
	return <div className={cn('flex items-center', justifyStart, flexGap[gap])}>{showOption && <>{children}</>}</div>;
}
