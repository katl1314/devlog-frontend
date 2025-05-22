'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'));

type Preview = 'live' | 'edit' | 'preview';

interface Editor {
	placeholder?: string;
	name?: string;
	preview?: Preview;
}

export default function CustomEditor({ placeholder, name, preview = 'edit' }: Editor) {
	const [value, setValue] = useState('');

	return (
		<MDEditor
			value={value}
			onChange={html => setValue(html!)}
			autoFocus={true}
			preview={preview}
			height={window.innerHeight - 200}
			maxHeight={1000}
			textareaProps={{
				placeholder: placeholder || '내용을 입력하세요.',
				name: name || 'content'
			}}
		/>
	);
}
