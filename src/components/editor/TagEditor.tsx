'use client';

import { KeyboardEventHandler, useState } from 'react';
import { toast } from 'sonner';

interface ITagEditor {
	onChange: (tags: string[]) => void;
	tags: string[];
	max?: number;
}

export default function TagEditor({ tags, onChange, max = 5 }: ITagEditor) {
	const [inputValue, setInputValue] = useState('');

	// 태그 추가 로직
	const addTag = (value: string) => {
		const trimmedValue = value.trim();
		if (trimmedValue.length < 1) return;

		if (tags.length >= max) {
			toast.error(`태그는 최대 ${max}개까지만 입력할 수 있습니다.`);
			return;
		}

		if (tags.includes(trimmedValue)) {
			toast.warning('이미 동일한 태그가 있습니다.');
			return;
		}

		onChange([...tags, trimmedValue]);
		setInputValue(''); // 입력창 초기화
	};

	// 태그 삭제 로직 (마지막 태그 삭제)
	const removeLastTag = () => {
		onChange(tags.slice(0, -1));
	};

	// 키보드 이벤트 핸들러 통합
	const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
		// 한글 입력 중 조합 문제 방지 (isComposing)
		if (e.nativeEvent.isComposing) return;

		if (e.key === 'Enter') {
			e.preventDefault(); // 폼 제출 방지
			addTag(inputValue);
		} else if (e.key === 'Backspace' && inputValue === '') {
			removeLastTag();
		}
	};

	return (
		<div className="w-full flex flex-wrap items-center gap-2 min-h-[40px]">
			{/* 태그 리스트 */}
			{tags.map((tag) => (
				<span
					key={tag}
					className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors duration-200 cursor-default animate-in fade-in zoom-in-95"
				>
          <span className="text-emerald-500 mr-1 font-bold">#</span>
					{tag}
        </span>
			))}

			{/* 입력창 */}
			<input
				type="text"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				onKeyDown={handleKeyDown}
				className="flex-1 min-w-[180px] bg-transparent outline-none text-lg text-neutral-800 placeholder:text-neutral-300 placeholder:font-light"
				placeholder="태그를 입력하세요 (Enter 입력)"
			/>
		</div>
	);
}