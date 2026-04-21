'use client';

import { ReactNode, useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ConfirmDialogProps {
	/** 다이얼로그를 여는 trigger UI. asChild로 자동 래핑된다 */
	children: ReactNode;
	title: string;
	description?: string;
	confirmText?: string;
	cancelText?: string;
	/** destructive면 확인 버튼에 위험 스타일 적용 */
	variant?: 'default' | 'destructive';
	onConfirm: () => void | Promise<void>;
}

/**
 * 사용자의 명시적 확인이 필요한 작업(삭제, 탈퇴 등)에 사용하는 확인 다이얼로그.
 *
 * @remarks
 * - `onConfirm`이 Promise면 resolve까지 버튼을 비활성화하고, 성공 시 자동으로 닫힌다.
 *   실패하면 다이얼로그를 유지해 소비자가 에러 토스트 등으로 후속 처리할 수 있게 한다.
 * - pending 중에는 overlay 클릭/ESC로 닫히지 않아 async 작업이 중단되지 않는다.
 */
export function ConfirmDialog({
	children,
	title,
	description,
	confirmText = '확인',
	cancelText = '취소',
	variant = 'default',
	onConfirm
}: ConfirmDialogProps) {
	const [open, setOpen] = useState(false);
	const [isPending, setIsPending] = useState(false);

	const handleConfirm = async () => {
		setIsPending(true);
		try {
			await onConfirm();
			setOpen(false);
		} finally {
			setIsPending(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={next => !isPending && setOpen(next)}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent
				onInteractOutside={e => isPending && e.preventDefault()}
				onEscapeKeyDown={e => isPending && e.preventDefault()}
			>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					{description && <DialogDescription>{description}</DialogDescription>}
				</DialogHeader>
				<DialogFooter>
					<Button
						variant="outline"
						disabled={isPending}
						onClick={() => setOpen(false)}
					>
						{cancelText}
					</Button>
					<Button
						variant={variant}
						disabled={isPending}
						onClick={handleConfirm}
					>
						{confirmText}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
