'use client';

import { useState, useTransition } from 'react';
import { signOut } from 'next-auth/react';
import { toast } from 'sonner';
import { deleteAccount } from '@/actions/actions';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogClose,
	DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CONFIRM_TEXT = '탈퇴합니다';

export default function DeleteAccountDialog() {
	const [confirmInput, setConfirmInput] = useState('');
	const [isPending, startTransition] = useTransition();

	const isConfirmed = confirmInput === CONFIRM_TEXT;

	const handleDeleteAccount = () => {
		startTransition(async () => {
			try {
				await deleteAccount();
				await signOut({ callbackUrl: '/' });
			} catch {
				toast.error('탈퇴 처리에 실패했습니다. 다시 시도해 주세요.');
			}
		});
	};

	return (
		<Dialog onOpenChange={open => { if (!open) setConfirmInput(''); }}>
			<DialogTrigger asChild>
				<Button type="button" variant="destructive" className="px-6 py-3 h-auto rounded-[10px] font-bold">
					회원 탈퇴
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>회원 탈퇴</DialogTitle>
					<DialogDescription>
						탈퇴 시 모든 게시물·댓글·팔로우 관계·좋아요가 즉시 숨김되며, 7일 후 완전히 삭제됩니다. 7일 이내 재로그인 시 모두 복구됩니다.
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-2">
					<p className="text-sm text-muted-foreground">
						계속하려면 아래 입력란에 <span className="font-semibold text-foreground">{CONFIRM_TEXT}</span>를 입력하세요.
					</p>
					<Input
						type="text"
						value={confirmInput}
						onChange={e => setConfirmInput(e.target.value)}
						placeholder={CONFIRM_TEXT}
						disabled={isPending}
					/>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button type="button" variant="ghost" disabled={isPending}>
							취소
						</Button>
					</DialogClose>
					<Button
						type="button"
						variant="destructive"
						disabled={!isConfirmed || isPending}
						onClick={handleDeleteAccount}
					>
						{isPending ? '처리 중...' : '탈퇴하기'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
