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
import { Label } from '../ui/label';

export default function Editor({ content, setContent }: { content: string; setContent: (content: string) => void }) {
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
			ListItem
		],
		content: content,
		onUpdate: function ({ editor }) {
			debugger;
			console.log(editor);
		}
	});

	return (
		<div className="markdown-body">
			<div className="control-group">
				<div className="button-group">
					<Label
						onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
						className={editor?.isActive('heading', { level: 1 }) ? 'isActive' : ''}
					>
						H1
					</Label>
					<Label
						onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
						className={editor?.isActive('heading', { level: 2 }) ? 'isActive' : ''}
					>
						H2
					</Label>
					<Label
						onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
						className={editor?.isActive('heading', { level: 3 }) ? 'isActive' : ''}
					>
						H3
					</Label>
				</div>
			</div>
			<EditorContent editor={editor} height={500} />
		</div>
	);
}
