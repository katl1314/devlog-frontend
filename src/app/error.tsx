'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

type IError = {
	error: Error & { digest?: string };
	reset: () => void;
};

export default function Error({ error, reset }: IError) {
	const router = useRouter();

	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4">
			<div className="max-w-md w-full text-center">
				<h1 className="text-[9rem] font-black leading-none tracking-tighter text-foreground/90 select-none mb-8">
					500
				</h1>

				<h2 className="text-2xl sm:text-3xl font-bold mb-3 break-keep">
					문제가 발생했습니다
				</h2>

				<p className="text-muted-foreground text-base sm:text-lg mb-10 leading-relaxed break-keep">
					일시적인 오류가 발생했습니다.
					<br className="hidden sm:block" />
					잠시 후 다시 시도해 주세요.
				</p>

				<div className="flex flex-col sm:flex-row gap-3 justify-center">
					<Button size="lg" onClick={reset} className="rounded-full px-8">
						다시 시도
					</Button>
					<Button size="lg" variant="outline" onClick={() => router.push('/')} className="rounded-full px-8">
						홈으로 돌아가기
					</Button>
				</div>
			</div>
		</div>
	);
}
