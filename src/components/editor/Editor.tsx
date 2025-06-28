'use client';

import dynamic from 'next/dynamic';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'));

type Preview = 'live' | 'edit' | 'preview';

interface Editor {
	placeholder?: string;
	name?: string;
	preview?: Preview;
	height?: number;
	maxHeight?: number;
	setContent: (value: string) => void;
	defaultValue: string;
}

export default function CustomEditor({
	placeholder,
	setContent,
	defaultValue,
	name,
	preview = 'edit',
	height = 650,
	maxHeight = 1000
}: Editor) {
	return (
		<MDEditor
			value={defaultValue}
			onChange={html => setContent(html!)}
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
