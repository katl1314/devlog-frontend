'use client';

import { useState } from 'react';
// 컴포넌트 정리 합시다.
import { ParagraphNode, TextNode } from 'lexical';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { TooltipProvider } from '@/components/ui/tooltip';
import { editorTheme } from '@/components/editor/themes/editor-theme';
import { ContentEditable } from '@/components/editor/editor-ui/content-editable';
import { ToolbarPlugin } from '@/components/editor/plugins/toolbar/toolbar-plugin';
import { BlockFormatDropDown } from './editor/plugins/toolbar/block-format-toolbar-plugin';
import { FormatParagraph } from './editor/plugins/toolbar/block-format/format-paragraph';
import { FormatBulletedList } from './editor/plugins/toolbar/block-format/format-bulleted-list';
import { FormatCheckList } from './editor/plugins/toolbar/block-format/format-check-list';
import { FormatHeading } from './editor/plugins/toolbar/block-format/format-heading';
import { FormatNumberedList } from './editor/plugins/toolbar/block-format/format-numbered-list';
import { FormatQuote } from './editor/plugins/toolbar/block-format/format-quote';
import { FontFormatToolbarPlugin } from '@/components/editor/plugins/toolbar/font-format-toolbar-plugin';
import { FontBackgroundToolbarPlugin } from '@/components/editor/plugins/toolbar/font-background-toolbar-plugin';
import { FontColorToolbarPlugin } from '@/components/editor/plugins/toolbar/font-color-toolbar-plugin';
import { ElementFormatToolbarPlugin } from '@/components/editor/plugins/toolbar/element-format-toolbar-plugin';
import { ClickableLinkPlugin } from '@lexical/react/LexicalClickableLinkPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { CodeNode } from '@lexical/code';
import { ListNode, ListItemNode } from '@lexical/list';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
import { LinkNode, AutoLinkNode } from '@lexical/link';
import { cn } from '@/lib/utils';

const editorConfig: InitialConfigType = {
	namespace: 'Editor',
	theme: editorTheme,
	nodes: [
		HeadingNode,
		QuoteNode,
		CodeNode,
		ListNode,
		ListItemNode,
		ParagraphNode,
		TextNode,
		HorizontalRuleNode,
		LinkNode,
		AutoLinkNode
	],
	onError: (error: Error) => {
		console.error(error);
	}
};

interface Editor {
	useToolbar?: boolean;
	size?: keyof typeof editorSize;
	useMarkdown?: boolean;
	placeholder?: string;
}

const editorSize = {
	sm: 'h-[65px]',
	base: 'h-[200px]',
	lg: 'h-[300px]',
	xlg: 'h-[calc(100vh-300px)]',
	xxlg: 'h-[calc(100vh-200px)]'
};

export default function Editor(props: Editor) {
	return (
		<div className="$w-full overflow-hidden rounded-lg border bg-background shadow">
			<LexicalComposer
				initialConfig={{
					...editorConfig
				}}
			>
				<TooltipProvider>
					<Plugins {...props} />
				</TooltipProvider>
			</LexicalComposer>
		</div>
	);
}

export function Plugins({
	useToolbar = true,
	useMarkdown = true,
	size = 'base',
	placeholder = 'Start typing...'
}: Editor) {
	const [, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null);
	const onRef = (_floatingAnchorElem: HTMLDivElement) => {
		if (_floatingAnchorElem !== null) {
			setFloatingAnchorElem(_floatingAnchorElem);
		}
	};

	return (
		<div className="relative">
			{useToolbar && (
				<ToolbarPlugin>
					{() => (
						<div className="vertical-align-middle sticky top-0 z-10 flex gap-2 overflow-auto border-b p-1">
							<BlockFormatDropDown>
								<FormatParagraph />
								<FormatHeading levels={['h1', 'h2', 'h3']} />
								<FormatNumberedList />
								<FormatBulletedList />
								<FormatCheckList />
								<FormatQuote />
							</BlockFormatDropDown>
							<FontFormatToolbarPlugin format="bold" />
							<FontFormatToolbarPlugin format="italic" />
							<FontFormatToolbarPlugin format="underline" />
							<FontFormatToolbarPlugin format="strikethrough" />
							<FontColorToolbarPlugin />
							<FontBackgroundToolbarPlugin />
							<ElementFormatToolbarPlugin />
							<ClickableLinkPlugin />
						</div>
					)}
				</ToolbarPlugin>
			)}

			<div className="relative">
				<RichTextPlugin
					contentEditable={
						<div className="">
							<div className="" ref={onRef}>
								<ContentEditable
									placeholder={placeholder}
									className={cn(
										'ContentEditable__root relative block min-h-72 overflow-auto min-h-full px-8 py-4 focus:outline-none',
										editorSize[size]
									)}
								/>
							</div>
						</div>
					}
					ErrorBoundary={LexicalErrorBoundary}
				/>
				<HistoryPlugin />
				{useMarkdown && <MarkdownShortcutPlugin />}
			</div>
		</div>
	);
}
