'use client';

import './styles.scss';

import { useEditor, EditorContent } from '@tiptap/react';
import Document from '@tiptap/extension-document';
import Heading from '@tiptap/extension-heading';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import BulletList from '@tiptap/extension-bullet-list';
import Placeholder from '@tiptap/extension-placeholder';
import ControlPanel from './ControlPanel';

interface Editor {
	content: string;
	setContent: (content: string) => void;
}

export default function Editor({ content, setContent }: Editor) {
	const editor = useEditor({
		extensions: [
			Document,
			Paragraph,
			Text,
			Heading.configure({
				levels: [1, 2, 3]
			}),
			BulletList,
			OrderedList,
			ListItem,
			Placeholder.configure({
				placeholder: '무엇이든 입력하세요.'
			})
		],
		content: content,
		onUpdate: function ({ editor }) {
			setContent(editor.view.dom.innerHTML);
		},

		editorProps: {
			attributes: {
				class: 'flex-1 max-h-[calc(100vh-300px)] py-3 overflow-auto'
			}
		}
	});

	return (
		<div className="markdown-body px-3">
			<ControlPanel editor={editor!} />
			<EditorContent editor={editor} />
		</div>
	);
}
