'use client';

import { useEffect, useRef, useState } from 'react';

const levelClasses: { [name: string]: string } = {
	H1: 'pl-1',
	H2: 'pl-2',
	H3: 'pl-4'
};

export default function Toc() {
	const [hTags, setHTags] = useState<[] | NodeListOf<HTMLElement>>([]);
	const focusedTag = useRef<HTMLElement | null>(null);

	// 초기 렌더링 시 h태그 찾기
	useEffect(() => {
		const entryPoint = document.querySelector('#content__entry_point');
		const hTagsEl = entryPoint?.querySelectorAll('h1, h2, h3') as NodeListOf<HTMLElement>;
		setHTags(hTagsEl);
	}, []);

	// hTags를 모두 찾을때 실행한다.
	useEffect(() => {
		const hTagToTocElMapper = new Map<string, HTMLElement>();
		const listContainer = document?.querySelector('#toc__list');

		(hTags ?? []).forEach(hTag => {
			const list = document.createElement('li');
			const linkEl = document.createElement('a');

			linkEl.innerHTML = hTag.innerHTML;

			// 클릭 이벤트

			list.appendChild(linkEl);

			const levelClass = levelClasses[hTag.nodeName];
			list.classList.add(levelClass, 'mb-1');
			hTagToTocElMapper.set(hTag.innerHTML, list);

			listContainer?.appendChild(list);
		});

		setFocusedElement();

		const findCurTagEvent = (window.onscroll = () => setFocusedElement());

		function setFocusedElement() {
			const content = document.querySelector('#content__entry_point') as HTMLElement;
			if (content) {
				const mainContentHeight = content.offsetHeight + window.scrollY;

				const mainTag = getMainElementAtMainContentHeight(mainContentHeight);
				const focusedTocTag = hTagToTocElMapper.get(mainTag?.innerHTML);
				focusedTag.current?.classList.remove('focused'); // 기존 노드에 대해서 focused 클래스를 삭제
				focusedTocTag?.classList.add('focused'); // 다음 노드에 대해서 focused 클래스를 부여한다.
				focusedTag.current = focusedTocTag ?? null;
			}
		}

		function getMainElementAtMainContentHeight(mainContentHeight: number) {
			let MT = hTags[0];

			for (let i = 1; i < hTags.length; i++) {
				const PT = hTags[i];
				if (mainContentHeight < MT.offsetTop && mainContentHeight < PT.offsetTop) {
					return MT;
				} else if (MT.offsetTop < mainContentHeight && mainContentHeight <= PT.offsetTop) {
					return MT;
				} else {
					MT = PT;
				}
			}
			return MT;
		}

		// 스크롤 이벤트 클린업 => 언마운트시 실행한다.
		return findCurTagEvent;
	}, [hTags]);

	return (
		<div className="hidden lg:block sticky top-[20px] text-neutral-500">
			<div className="absolute right-[-150px] max-w-[100px] min-w-[100px]">
				{hTags.length > 0 && (
					<div className="border-l-1 border-l-[#e5e5e5] pl-[10px]">
						<nav>
							<div className="">
								<ul className="" id="toc__list"></ul>
							</div>
						</nav>
					</div>
				)}
			</div>
		</div>
	);
}
