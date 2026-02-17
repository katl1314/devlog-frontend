'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function NotFound() {
	const router = useRouter();

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900 px-4">
			<div className="max-w-md w-full text-center">

				<div className="relative mb-8">
					<h1
						className="text-[9rem] font-black leading-none text-[#12b886] tracking-tighter select-none animate-float"
						style={{ textShadow: '0 10px 30px rgba(18, 184, 134, 0.2)' }}
					>
						404
					</h1>
				</div>

				{/* Text Content */}
				<h2 className="text-3xl font-bold mb-3 text-gray-800 break-keep">
					앗! 페이지를 찾을 수 없습니다.
				</h2>

				<p className="text-gray-500 text-lg mb-10 leading-relaxed break-keep">
					방문하시려는 페이지의 주소가 잘못 입력되었거나,<br className="hidden sm:block" />
					삭제되어 더 이상 존재하지 않습니다.
				</p>

				{/* Action Buttons */}
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Button
						onClick={() => router.push('/')}
						className="
              inline-flex items-center justify-center
              bg-[#12b886] text-white font-bold py-3.5 px-8 rounded-full
              shadow-lg shadow-[#12b886]/20
              transition-all duration-200
              hover:bg-[#0ca678] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#12b886]/30
              active:scale-95
            "
					>
						홈으로 돌아가기
					</Button>

					<Button
						onClick={() => router.back()}
						className="
              inline-flex items-center justify-center
              bg-white text-gray-600 font-bold py-3.5 px-8 rounded-full border border-gray-200
              transition-all duration-200
              hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300
              active:scale-95
            "
					>
						이전 페이지
					</Button>
				</div>
			</div>
		</div>
	);
}