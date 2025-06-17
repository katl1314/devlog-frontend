'use client';

import { useEffect, useRef, useState } from 'react';

const levelClasses: { [name: string]: string } = {
	H1: 'pl-1',
	H2: 'pl-2',
	H3: 'pl-4'
};

export default function ToC() {
	const [tocOpened, setTocOpened] = useState(false);
	const [hTags, setHTags] = useState<[] | NodeListOf<HTMLElement>>([]);
	const focusedTag = useRef<HTMLElement | null>(null);

	// 초기 렌더링 시 h태그 찾기
	useEffect(() => {
		const entryPoint = document.querySelector('#content__entry_point');
		const hTagsEl = entryPoint?.querySelectorAll('h1, h2, h3') as NodeListOf<HTMLElement>;
		setHTags(hTagsEl);

		const width = window.innerWidth;

		// 페이지 너비가 1350px보다 크면 Toc는 보여지는 상태로 설정한다.
		if (width >= 1350) {
			setTocOpened(true);
		}
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
	}, [hTags]);

	return (
		<div className="hidden lg:block sticky top-[20px] text-neutral-500">
			<div className="absolute right-[-150px]">
				<div onClick={() => setTocOpened(prev => !prev)}>{/* <ListIcon size="25px" /> */}</div>
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
