'use client';

import { KeyboardEventHandler, useState } from 'react';
import { toast } from 'sonner';
import { FiPlus } from 'react-icons/fi';
import { Button } from '@/components/ui/button';

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
	const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = e => {
		// 한글 입력 중 조합 문제 방지 (isComposing)
		if (e.nativeEvent.isComposing) return;

		if (e.key === 'Enter' || e.key === ',') {
			e.preventDefault();
			addTag(inputValue);
		} else if (e.key === 'Backspace' && inputValue === '') {
			removeLastTag();
		}
	};

	return (
		<div className="w-full flex flex-wrap items-center gap-2 min-h-10">
			{/* 태그 리스트 */}
			{tags.map(tag => (
				<span
					key={tag}
					className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-muted text-foreground hover:bg-muted/70 transition-colors duration-200 cursor-default animate-in fade-in zoom-in-95"
				>
					<span className="text-muted-foreground mr-1">#</span>
					{tag}
				</span>
			))}

			{/* 입력창 + 추가 버튼 */}
			<div className="flex-1 flex items-center gap-1 min-w-45">
				<input
					type="text"
					value={inputValue}
					onChange={e => setInputValue(e.target.value)}
					onKeyDown={handleKeyDown}
					className="flex-1 bg-transparent outline-none text-lg text-foreground placeholder:text-muted-foreground placeholder:font-light"
					placeholder="태그 입력 후 Enter 또는 + 클릭"
				/>
				{inputValue.trim() && (
					<Button
						type="button"
						onClick={() => addTag(inputValue)}
						className="shrink-0 w-6 h-6 rounded-full bg-foreground text-background hover:bg-foreground/80 hover:text-background"
					>
						<FiPlus size={14} className="size-3.5" />
					</Button>
				)}
			</div>
		</div>
	);
}
