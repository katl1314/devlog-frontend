// app/not-found.tsx
'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

export default function NotFound() {
	const router = useRouter();

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 px-4 text-center">
			<h1 className="text-8xl font-extrabold text-red-500 mb-4">404</h1>
			<h2 className="text-3xl font-semibold mb-2">
				페이지를 찾을 수 없습니다.
			</h2>
			<p className="max-w-md mb-8 text-lg leading-relaxed">
				요청하신 페이지가 존재하지 않거나 삭제되었습니다. 주소를 다시
				확인해주세요.
			</p>
			<button
				onClick={() => router.push('/')}
				className="bg-blue-600 hover:bg-blue-700 text-white rounded-md py-3 px-6 shadow-md transition-colors cursor-pointer"
			>
				홈으로 돌아가기
			</button>
		</div>
	);
}
