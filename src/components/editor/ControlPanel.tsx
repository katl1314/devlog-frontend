'use client';

import { Label } from '../ui/label';
import { cn } from '@/lib/utils';
import { Editor } from '@tiptap/react';
import { RiH1, RiH2, RiH3 } from 'react-icons/ri';

export default function ControlPanel({ editor }: { editor: Editor }) {
	return (
		<div className="control-group mb-1">
			<div className="flex gap-2">
				<Label
					onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
					className={cn(editor?.isActive('heading', { level: 1 }) ? 'bg-neutral-400' : '', 'text-lg cursor-pointer')}
				>
					<RiH1 size={20} />
				</Label>
				<Label
					onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
					className={cn(editor?.isActive('heading', { level: 2 }) ? 'bg-neutral-400' : '', 'text-lg cursor-pointer')}
				>
					<RiH2 size={20} />
				</Label>
				<Label
					onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
					className={cn(editor?.isActive('heading', { level: 3 }) ? 'bg-neutral-400' : '', 'text-lg cursor-pointer')}
				>
					<RiH3 size={20} />
				</Label>
			</div>
		</div>
	);
}
