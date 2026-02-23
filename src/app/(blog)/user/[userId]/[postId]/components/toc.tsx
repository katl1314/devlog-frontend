'use client';

import { useEffect, useState } from 'react';

interface HeadingItem {
	id: string;
	text: string;
	level: string; // 'H1' | 'H2' | 'H3'
	top: number;
}

// 제목별 클래스
const levelClasses: { [key: string]: string } = {
	H1: 'pl-1',
	H2: 'pl-2',
	H3: 'pl-4',
};

export default function Toc() {
	const [headings, setHeadings] = useState<HeadingItem[]>([]);
	const [activeId, setActiveId] = useState<string>('');

	//헤딩 태그 찾기 및 데이터 가공
	useEffect(() => {
		// DOM 쿼리는 한 번만 실행하거나, 본문 내용이 바뀔 때 실행
		const updateHeadings = () => {
			const entryPoint = document.querySelector('#content__entry_point');
			if (!entryPoint) return;

			const elements = entryPoint.querySelectorAll('h1, h2, h3');
			const headingData: HeadingItem[] = Array.from(elements).map((el) => {
				// id가 없다면 임의로 생성 (앵커 이동을 위해 필수)
				if (!el.id) {
					el.id = el.innerHTML.trim().replace(/\s+/g, '-');
				}

				return {
					id: el.id,
					text: (el as HTMLElement).innerText,
					level: el.tagName,
					top: (el as HTMLElement).getBoundingClientRect().top + window.scrollY,
				};
			});

			setHeadings(headingData);
		};

		updateHeadings();

		window.addEventListener('resize', updateHeadings); // 브라우저 리사이즈 감지
		return () => window.removeEventListener('resize', updateHeadings);
	}, []);

	// 2. 스크롤 이벤트로 현재 활성화된 헤딩 찾기
	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY;
			// 상단 여백(헤더 높이 등)을 고려해 약간의 오프셋을 줍니다 (예: 100px)
			const offset = 100;

			// 현재 스크롤 위치보다 위에 있는 헤딩들 중 가장 마지막 것(가장 가까운 것)을 찾음
			// reverse()를 쓰는 이유는 배열 뒤에서부터 찾는 게 빠르기 때문 (선택사항)
			const currentHeading = headings
				.slice()
				.reverse()
				.find((h) => h.top <= scrollY + offset);

			if (currentHeading) {
				setActiveId(currentHeading.id);
			} else if (headings.length > 0 && scrollY < headings[0].top) {
				// 맨 위로 올라갔을 때 첫 번째 헤딩 활성화 해제 혹은 유지 (취향에 따라)
				setActiveId('');
			}
		};

		// 스크롤 이벤트 등록 (성능을 위해 requestAnimationFrame 사용 추천)
		let ticking = false;
		const onScroll = () => {
			if (!ticking) {
				window.requestAnimationFrame(() => {
					handleScroll();
					ticking = false;
				});
				ticking = true;
			}
		};

		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, [headings]);

	// UI 렌더링 (React 방식)
	return (
		<div className="hidden xl:block sticky top-[20px] text-neutral-500">
			<div className="absolute right-[-200px] max-w-[200px] min-w-[100px] xl:h-full text-sm">
				{headings.length > 0 && (
					<div className="border-l-1 border-l-[#e5e5e5] pl-[10px] xl:sticky xl:top-[30px]">
						<nav>
							<ul id="toc__list">
								{headings.map((heading) => (
									<li
										key={heading.id}
										className={`mb-1 transition-colors duration-200 ${
											levelClasses[heading.level]
										} ${
											activeId === heading.id
												? 'text-indigo-600 font-bold border-l-2 border-indigo-600 -ml-[12px] pl-[10px] bg-indigo-50/50' // focused 스타일 예시
												: 'hover:text-neutral-800'
										}`}
									>
										<a href={`#${heading.id}`} className="block w-full">
											{heading.text}
										</a>
									</li>
								))}
							</ul>
						</nav>
					</div>
				)}
			</div>
		</div>
	);
}