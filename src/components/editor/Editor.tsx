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
import { cn } from '@/lib/utils';

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
			setContent(editor.view.dom.innerHTML);
		},
		editorProps: {
			attributes: {
				class: 'flex-1 h-[500px] p-3'
			}
		}
	});

	return (
		<div className="markdown-body">
			<div className="control-group mb-1">
				<div className="flex gap-2">
					<Label
						onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
						className={cn(editor?.isActive('heading', { level: 1 }) ? 'bg-neutral-400' : '', 'text-lg')}
					>
						H1
					</Label>
					<Label
						onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
						className={cn(editor?.isActive('heading', { level: 2 }) ? 'bg-neutral-400' : '', 'text-lg')}
					>
						H2
					</Label>
					<Label
						onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
						className={cn(editor?.isActive('heading', { level: 3 }) ? 'bg-neutral-400' : '', 'text-lg')}
					>
						H3
					</Label>
				</div>
			</div>
			<EditorContent editor={editor} />
		</div>
	);
}
