'use client';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const MDEditor = dynamic(() => import('@uiw/react-md-editor').then(mod => mod.default), { ssr: false });
const EditerMarkdown = dynamic(
	() =>
		import('@uiw/react-md-editor').then(mod => {
			return mod.default.Markdown;
		}),
	{ ssr: false }
);

export default function App() {
	// 모바일인지 아닌지 확인은 해상도를 통해서...
	const [value, setValue] = useState('**Hello world!!!**');

	return (
		<div className="container">
			<MDEditor
				value={value}
				onChange={value => setValue(value!)}
				height={500}
				hideToolbar={false}
				fullscreen={true}
				preview={'edit'}
			/>
			<div style={{ paddingTop: 50 }}>
				<EditerMarkdown source={value} />
			</div>
		</div>
	);
}
