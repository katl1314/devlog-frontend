'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'));

type Preview = 'live' | 'edit' | 'preview';

interface Editor {
	placeholder?: string;
	name?: string;
	preview?: Preview;
	height?: number;
	maxHeight?: number;
}

export default function CustomEditor({ placeholder, name, preview = 'edit', height = 650, maxHeight = 1000 }: Editor) {
	const [value, setValue] = useState('');

	return (
		<MDEditor
			value={value}
			onChange={html => setValue(html!)}
			autoFocus={true}
			preview={preview}
			height={height}
			maxHeight={maxHeight}
			textareaProps={{
				placeholder: placeholder || '내용을 입력하세요.',
				name: name || 'content'
			}}
		/>
	);
}
