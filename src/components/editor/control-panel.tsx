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
	RiStrikethrough2,
	RiImageAddLine
} from 'react-icons/ri';
import { cn } from '@/utils';
import { useTheme } from '@/hooks/theme';
import { useCallback, useRef } from 'react';

interface IControlPanel {
	editor: Editor;
	onImageUpload?: (file: File) => Promise<string>;
}

export default function ControlPanel({ editor, onImageUpload }: IControlPanel) {
	const { theme } = useTheme();
	const fill = theme === 'dark' ? 'white' : 'black';
	const fileInputRef = useRef<HTMLInputElement>(null);

	const setLink = useCallback(() => {
		const previousUrl = editor?.getAttributes('link').href;
		const url = window.prompt('URL', previousUrl);

		if (url === null) {
			return;
		}

		if (url === '') {
			editor?.chain().focus().extendMarkRange('link').unsetLink().run();
			return;
		}

		try {
			editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
		} catch (e) {}
	}, [editor]);

	const handleImageSelect = useCallback(
		async (e: React.ChangeEvent<HTMLInputElement>) => {
			const file = e.target.files?.[0];
			if (!file || !onImageUpload) return;
			try {
				const url = await onImageUpload(file);
				editor.chain().focus().setImage({ src: url }).run();
			} catch {
				// toast는 onImageUpload(handleImageUpload)에서 표시됨
			} finally {
				e.target.value = '';
			}
		},
		[editor, onImageUpload]
	);

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
				<div className="w-px h-5 bg-neutral-300"></div>
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
				<div className="w-px h-5 bg-neutral-300"></div>
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
				<div className="w-px h-5 bg-neutral-300"></div>
			</div>

			{onImageUpload && (
				<div className="flex gap-4 items-center">
					<input
						ref={fileInputRef}
						type="file"
						accept="image/*"
						className="hidden"
						onChange={handleImageSelect}
					/>
					<Label
						title="Image"
						aria-description="Image Upload"
						onClick={() => fileInputRef.current?.click()}
						className="tool"
						tabIndex={0}
					>
						<RiImageAddLine size={20} fill={fill} />
					</Label>
				</div>
			)}
		</div>
	);
}
