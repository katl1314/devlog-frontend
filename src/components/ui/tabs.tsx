'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { cn } from '@/utils';

type TabsType = 'segment' | 'line';

type TabsContextValue = {
	active: string;
	setActive: (value: string) => void;
	type: TabsType;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs() {
	const ctx = useContext(TabsContext);
	if (!ctx) throw new Error('Tabs 컴포넌트 내부에서만 사용할 수 있습니다.');
	return ctx;
}

type TabsProps = {
	defaultValue: string;
	type: TabsType;
	children: ReactNode;
	className?: string;
};

function Tabs({ defaultValue, type, children, className }: TabsProps) {
	const [active, setActive] = useState(defaultValue);
	return (
		<TabsContext.Provider value={{ active, setActive, type }}>
			<div className={className}>{children}</div>
		</TabsContext.Provider>
	);
}

function TabsList({ children, className }: { children: ReactNode; className?: string }) {
	const { type } = useTabs();
	return (
		<div className={cn('flex', type === 'line' && 'border-b border-border', className)}>
			{children}
		</div>
	);
}

type TabsItemProps = {
	value: string;
	children: ReactNode;
	className?: string;
};

function TabsItem({ value, children, className }: TabsItemProps) {
	const { active, setActive, type } = useTabs();
	const isActive = active === value;

	return (
		<button
			type="button"
			onClick={() => setActive(value)}
			className={cn(
				'transition-colors cursor-pointer',
				type === 'line' && [
					'px-3 py-3.5 text-sm font-semibold border-b-2',
					isActive
						? 'border-foreground text-foreground'
						: 'border-transparent text-muted-foreground hover:text-foreground'
				],
				type === 'segment' && [
					'px-4 py-1.5 text-sm font-semibold rounded-full',
					isActive
						? 'bg-foreground text-background'
						: 'text-muted-foreground hover:text-foreground'
				],
				className
			)}
		>
			{children}
		</button>
	);
}

function TabsPanels({ children, className }: { children: ReactNode; className?: string }) {
	return <div className={className}>{children}</div>;
}

type TabsPanelProps = {
	value: string;
	children: ReactNode;
	className?: string;
};

function TabsPanel({ value, children, className }: TabsPanelProps) {
	const { active } = useTabs();
	if (active !== value) return null;
	return <div className={className}>{children}</div>;
}

Tabs.List = TabsList;
Tabs.Item = TabsItem;
Tabs.Panels = TabsPanels;
Tabs.Panel = TabsPanel;

export { useTabs };
export default Tabs;
