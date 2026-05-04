'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function NotFound() {
	const router = useRouter();

	return (
		<div className="flex flex-col items-center justify-center w-full min-h-[60vh] px-6 py-16 text-center">
			<h1 className="text-7xl sm:text-8xl font-black leading-none tracking-tighter text-foreground/90 mb-6 select-none">
				404
			</h1>
			<h2 className="text-xl sm:text-2xl font-bold mb-3 break-keep">페이지를 찾을 수 없습니다</h2>
			<p className="text-muted-foreground text-sm sm:text-base mb-8 leading-relaxed break-keep max-w-md">
				방문하시려는 페이지의 주소가 잘못 입력되었거나,
				<br className="hidden sm:block" />
				삭제되어 더 이상 존재하지 않습니다.
			</p>
			<div className="flex flex-col sm:flex-row gap-3 justify-center w-full max-w-md">
				<Button size="lg" onClick={() => router.push('/')} className="rounded-full px-8">
					홈으로 돌아가기
				</Button>
				<Button size="lg" variant="outline" onClick={() => router.back()} className="rounded-full px-8">
					이전 페이지
				</Button>
			</div>
		</div>
	);
}
