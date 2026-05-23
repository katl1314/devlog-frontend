'use client';

import { useState, useTransition } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { restoreUser } from '@/actions/actions';
import { Button } from '@/components/ui/button';

export default function RestoreActions() {
	const router = useRouter();
	const [isPendingRestore, startRestoreTransition] = useTransition();
	const [isPendingSignOut, startSignOutTransition] = useTransition();
	const [error, setError] = useState<string | null>(null);

	const handleRestore = () => {
		startRestoreTransition(async () => {
			const result = await restoreUser();
			if (result.ok) {
				toast.success('계정이 복구됐습니다. 다시 로그인해 주세요.');
				router.push('/auth');
			} else {
				setError(result.message ?? '계정 복구에 실패했습니다.');
			}
		});
	};

	const handleSignOut = () => {
		startSignOutTransition(async () => {
			await signOut({ callbackUrl: '/' });
		});
	};

	return (
		<div className="flex flex-col gap-3 w-full max-w-xs">
			{error && (
				<p className="text-destructive text-sm text-center">{error}</p>
			)}
			<Button
				type="button"
				onClick={handleRestore}
				disabled={isPendingRestore || isPendingSignOut}
				className="w-full py-3 h-auto rounded-full font-bold"
			>
				{isPendingRestore ? '복구 중...' : '계정 복구하기'}
			</Button>
			<Button
				type="button"
				variant="ghost"
				onClick={handleSignOut}
				disabled={isPendingRestore || isPendingSignOut}
				className="w-full text-muted-foreground font-semibold"
			>
				{isPendingSignOut ? '처리 중...' : '탈퇴 유지'}
			</Button>
		</div>
	);
}
