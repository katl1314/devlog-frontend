'use client';

import { Label } from '../ui/label';
import { Editor } from '@tiptap/react';
import {
	RiH1,
	RiH2,
	RiH3,
	RiH4,
	RiBold,
	RiItalic,
	RiCodeLine,
	RiCodeBlock,
	RiDoubleQuotesR,
	RiLink,
	RiStrikethrough2
} from 'react-icons/ri';
import { cn } from '@/lib/utils';
import { useTheme } from '@/store/theme';
import { useCallback } from 'react';

export default function ControlPanel({ editor }: { editor: Editor }) {
	const { theme } = useTheme();
	const fill = theme === 'dark' ? 'white' : 'black';
	// editer.isActive(group, condition);

	const setLink = useCallback(() => {
		const previousUrl = editor?.getAttributes('link').href;
		const url = window.prompt('URL', previousUrl);

		// cancelled
		if (url === null) {
			return;
		}

		// empty
		if (url === '') {
			editor?.chain().focus().extendMarkRange('link').unsetLink().run();

			return;
		}

		// update link
		try {
			editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
		} catch (e) {}
	}, [editor]);

	return (
		<div className="control-group mb-1 flex gap-4 items-center">
			<div className="flex gap-4 items-center">
				<Label
					title="Header-1"
					aria-description="Header 1"
					onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
					className={cn(editor?.isActive('heading', { level: 1 }) ? 'isActive' : '', 'tool')}
					tabIndex={0}
				>
					<RiH1 size={20} fill={fill} />
				</Label>
				<Label
					title="Header-2"
					aria-description="Header 2"
					onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
					className={cn(editor?.isActive('heading', { level: 2 }) ? 'isActive' : '', 'tool')}
					tabIndex={0}
				>
					<RiH2 size={20} fill={fill} />
				</Label>
				<Label
					title="Header-3"
					aria-description="Header 3"
					onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
					className={cn(editor?.isActive('heading', { level: 3 }) ? 'isActive' : '', 'tool')}
					tabIndex={0}
				>
					<RiH3 size={20} fill={fill} />
				</Label>
				<Label
					title="Header-4"
					aria-description="Header 4"
					onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
					className={cn(editor?.isActive('heading', { level: 4 }) ? 'isActive' : '', 'tool')}
					tabIndex={0}
				>
					<RiH4 size={20} fill={fill} />
				</Label>
				<div className="w-[1px] h-[20px] bg-neutral-300"></div>
			</div>
			<div className="flex gap-4 items-center">
				<Label
					title="Bold"
					aria-description="Bold"
					onClick={() => editor.chain().focus().toggleBold().run()}
					className={cn(editor?.isActive('bold') ? 'isActive' : '', 'tool')}
					tabIndex={0}
				>
					<RiBold size={20} fill={fill} />
				</Label>
				<Label
					title="Italic"
					aria-description="Italic"
					onClick={() => editor.chain().focus().toggleItalic().run()}
					className={cn(editor?.isActive('italic') ? 'isActive' : '', 'tool')}
					tabIndex={0}
				>
					<RiItalic size={20} fill={fill} />
				</Label>
				<Label
					title="StrikeThrough"
					aria-description="StrikeThrough"
					onClick={() => editor.chain().focus().toggleStrike().run()}
					className={cn(editor?.isActive('strike') ? 'isActive' : '', 'tool')}
					tabIndex={0}
				>
					<RiStrikethrough2 size={20} fill={fill} />
				</Label>
				<div className="w-[1px] h-[20px] bg-neutral-300"></div>
			</div>

			<div className="flex gap-4 items-center">
				<Label
					title="Code"
					aria-description="Code"
					onClick={() => editor.chain().focus().toggleCode().run()}
					className={cn(editor?.isActive('code') ? 'isActive' : '', 'tool')}
					tabIndex={0}
				>
					<RiCodeLine size={20} fill={fill} />
				</Label>
				<Label
					title="CodeBlock"
					aria-description="CodeBlock"
					onClick={() => editor.chain().focus().toggleCodeBlock().run()}
					className={cn(editor?.isActive('codeBlock') ? 'isActive' : '', 'tool')}
					tabIndex={0}
				>
					<RiCodeBlock size={20} fill={fill} />
				</Label>
			</div>
			<div className="flex gap-4 items-center">
				<Label
					title="BlockQuote"
					aria-description="BlockQuote"
					onClick={() => editor.chain().focus().toggleBlockquote().run()}
					className={cn(editor?.isActive('blockquote') ? 'isActive' : '', 'tool')}
					tabIndex={0}
				>
					<RiDoubleQuotesR size={20} fill={fill} />
				</Label>
				<Label title="Link" aria-description="Link" onClick={setLink} tabIndex={0}>
					<RiLink size={20} fill={fill} />
				</Label>
				<div className="w-[1px] h-[20px] bg-neutral-300"></div>
			</div>
		</div>
	);
}
