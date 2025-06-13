'use client';

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PropsWithChildren, useState } from 'react';

export function ConfirmDialog({
	children,
	title,
	description,
	afterConfirm
}: PropsWithChildren<{ title: string; description: string; afterConfirm: () => void }>) {
	const [open, setOpen] = useState<boolean>(false);

	const handleConfirm = () => {
		setOpen(false);
		afterConfirm();
	};
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">취소</Button>
					</DialogClose>
					<Button type="button" onClick={handleConfirm}>
						확인
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
