'use client';

import { Dispatch, KeyboardEventHandler, SetStateAction } from 'react';
import { toast } from 'sonner';

interface TagEditor {
	onChange: Dispatch<SetStateAction<string[]>>;
	tags: string[];
}

export default function TagEditor({ tags, onChange }: TagEditor) {
	const handleKeyDownEnter = (value: string) => {
		if (value.length < 1) return;
		if (tags.length >= 5) {
			toast('태그는 최대 5개까지만 입력할 수 있습니다.', {
				position: 'top-right',
				duration: 1500
			});
			return;
		}

		if (tags.includes(value)) {
			toast('이미 동일한 태그가 있습니다.', {
				position: 'top-right',
				duration: 1500
			});
			return;
		}
		onChange([...tags, value]);
	};

	const handleKeyUp: KeyboardEventHandler<HTMLInputElement> = e => {
		const value = e.currentTarget.value.trim();

		switch (e.key) {
			case 'Enter':
				e.preventDefault();
				handleKeyDownEnter(value);
				e.currentTarget.value = '';
				break;
		}
	};

	const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = e => {
		const value = e.currentTarget.value.trim();
		if (e.key === 'Backspace') {
			if (value === '') {
				onChange(tags.slice(0, -1));
			}
		}
	};
	return (
		<div className="flex gap-2 mt-3 h-[36px]">
			<div id="tags" className="flex flex-wrap gap-2">
				{tags.map(tag => (
					<div key={tag} className="bg-gray-200 rounded-md px-2 py-1 active:outline text-lg">
						{tag}
					</div>
				))}
			</div>
			<input
				type="text"
				className="outline-none text-lg"
				onKeyUp={handleKeyUp}
				onKeyDown={handleKeyDown}
				placeholder="태그를 입력해주세요."
			/>
		</div>
	);
}
