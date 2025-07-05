'use client';

import { Label } from '../ui/label';
import { Editor } from '@tiptap/react';
import { RiH1, RiH2, RiH3, RiBold, RiItalic, RiCodeLine, RiCodeBlock } from 'react-icons/ri';
import { cn } from '@/lib/utils';
import { useTheme } from '@/store/theme';

export default function ControlPanel({ editor }: { editor: Editor }) {
	const { theme } = useTheme();
	const fill = theme === 'dark' ? 'white' : 'black';
	// editer.isActive(group, condition);
	return (
		<div className="control-group mb-1 flex gap-4 items-center">
			<div className="flex gap-4">
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
			</div>
			<div className="w-[1px] h-[20px] bg-neutral-300"></div>
			<div className="flex gap-4">
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
			</div>
			<div className="w-[1px] h-[20px] bg-neutral-300"></div>
			<div className="flex gap-4">
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
					className={cn(editor?.isActive('code') ? 'isActive' : '', 'tool')}
					tabIndex={0}
				>
					<RiCodeBlock size={20} fill={fill} />
				</Label>
			</div>
			<div className="w-[1px] h-[20px] bg-neutral-300"></div>
			<div className="flex flex-1">테스트</div>
		</div>
	);
}
