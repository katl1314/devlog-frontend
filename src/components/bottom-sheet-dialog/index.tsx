'use client';

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	useRef,
	ReactNode,
	Children,
	isValidElement,
	cloneElement
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils';
import { Button } from '@/components/ui/button';

const LONG_PRESS_MS = 500;
interface BottomSheetDialogContextValue {
	open: boolean;
	setOpen: (open: boolean) => void;
}

const BottomSheetDialogContext =
	createContext<BottomSheetDialogContextValue | null>(null);

function useBottomSheetDialogContext() {
	const ctx = useContext(BottomSheetDialogContext);
	if (!ctx) throw new Error('BottomSheetDialog 내부에서 사용해야 합니다.');
	return ctx;
}

interface BottomSheetItemsContextValue {
	onItemClick?: (_id: string) => void;
}

const BottomSheetItemsContext = createContext<BottomSheetItemsContextValue>({});

function BottomSheetDialog({ children }: { children: ReactNode }) {
	const [open, setOpen] = useState(false);
	return (
		<BottomSheetDialogContext.Provider value={{ open, setOpen }}>
			{children}
		</BottomSheetDialogContext.Provider>
	);
}

interface TriggerProps {
	children: ReactNode;
	mode?: 'click' | 'longPress';
	onShortPress?: () => void;
}

function Trigger({ children, mode = 'click', onShortPress }: TriggerProps) {
	const { setOpen } = useBottomSheetDialogContext();
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const longPressedRef = useRef(false);

	const child = Children.only(children);
	if (!isValidElement(child)) return <>{children}</>;

	if (mode === 'click') {
		const existingOnClick = (child.props as any).onClick;
		return cloneElement(child as React.ReactElement<any>, {
			onClick: (e: React.MouseEvent) => {
				existingOnClick?.(e);
				setOpen(true);
			}
		});
	}

	// longPress 모드
	const handlePressStart = () => {
		longPressedRef.current = false;
		timerRef.current = setTimeout(() => {
			longPressedRef.current = true;
			setOpen(true);
		}, LONG_PRESS_MS);
	};

	const handlePressEnd = () => {
		if (timerRef.current) clearTimeout(timerRef.current);
		if (!longPressedRef.current) onShortPress?.();
	};

	const handlePressCancel = () => {
		if (timerRef.current) clearTimeout(timerRef.current);
	};

	const p = child.props as any;
	return cloneElement(child as React.ReactElement<any>, {
		onTouchStart: (e: React.TouchEvent) => {
			p.onTouchStart?.(e);
			handlePressStart();
		},
		onTouchEnd: (e: React.TouchEvent) => {
			p.onTouchEnd?.(e);
			handlePressEnd();
		},
		onTouchCancel: (e: React.TouchEvent) => {
			p.onTouchCancel?.(e);
			handlePressCancel();
		},
		onMouseDown: (e: React.MouseEvent) => {
			p.onMouseDown?.(e);
			handlePressStart();
		},
		onMouseUp: (e: React.MouseEvent) => {
			p.onMouseUp?.(e);
			handlePressEnd();
		},
		onMouseLeave: (e: React.MouseEvent) => {
			p.onMouseLeave?.(e);
			handlePressCancel();
		}
	});
}

function BackDrop({ className }: { className?: string }) {
	const { open, setOpen } = useBottomSheetDialogContext();
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);
	if (!mounted || !open) return null;
	return createPortal(
		<div
			className={cn(
				'fixed inset-0 z-50 bg-black/40 backdrop-blur-sm',
				className
			)}
			onClick={() => setOpen(false)}
		/>,
		document.body
	);
}

interface ItemsProps {
	children: ReactNode;
	onItemClick?: (id: string) => void;
	className?: string;
}

function Items({ children, onItemClick, className }: ItemsProps) {
	const { open } = useBottomSheetDialogContext();
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);
	if (!mounted) return null;
	return createPortal(
		<BottomSheetItemsContext.Provider value={{ onItemClick }}>
			<div
				className={cn(
					'fixed bottom-0 left-0 w-full z-51 bg-background rounded-t-3xl shadow-2xl transition-transform duration-300',
					open ? 'translate-y-0' : 'translate-y-full',
					className
				)}
			>
				<div className="flex justify-center pt-3 pb-1">
					<div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
				</div>
				{children}
			</div>
		</BottomSheetItemsContext.Provider>,
		document.body
	);
}

interface ItemProps {
	id: string;
	icon?: ReactNode;
	children: ReactNode;
	variant?: 'default' | 'destructive';
	className?: string;
}

function Item({
	id,
	icon,
	children,
	variant = 'default',
	className
}: ItemProps) {
	const { setOpen } = useBottomSheetDialogContext();
	const { onItemClick } = useContext(BottomSheetItemsContext);

	const handleClick = () => {
		setOpen(false);
		onItemClick?.(id);
	};

	return (
		<Button
			variant="ghost"
			className={cn(
				'flex items-center gap-3 px-4 py-3.5 h-auto rounded-2xl text-sm font-medium transition-colors text-left w-full justify-start',
				variant === 'default' && 'hover:bg-muted',
				variant === 'destructive' && 'hover:bg-muted',
				className
			)}
			onClick={handleClick}
		>
			{icon}
			{children}
		</Button>
	);
}

function Separator({ className }: { className?: string }) {
	return <div className={cn('mx-3 border-t border-border', className)} />;
}

function Caption({
	className,
	children
}: {
	className?: string;
	children?: React.ReactNode | React.ReactNode[];
}) {
	return <div className={className}>{children}</div>;
}

BottomSheetDialog.Trigger = Trigger;
BottomSheetDialog.BackDrop = BackDrop;
BottomSheetDialog.Items = Items;
BottomSheetDialog.Item = Item;
BottomSheetDialog.Separator = Separator;
BottomSheetDialog.Caption = Caption;

export default BottomSheetDialog;
