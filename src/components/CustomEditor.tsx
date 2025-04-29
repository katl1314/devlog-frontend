'use client';

import { useState } from 'react';

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
import { HistoryToolbarPlugin } from '@/components/editor/plugins/toolbar/history-toolbar-plugin';
import { BlockFormatDropDown } from './editor/plugins/toolbar/block-format-toolbar-plugin';
import { FormatParagraph } from './editor/plugins/toolbar/block-format/format-paragraph';
import { FormatBulletedList } from './editor/plugins/toolbar/block-format/format-bulleted-list';
import { FormatCheckList } from './editor/plugins/toolbar/block-format/format-check-list';
import { FormatHeading } from './editor/plugins/toolbar/block-format/format-heading';
import { FormatNumberedList } from './editor/plugins/toolbar/block-format/format-numbered-list';
import { FormatQuote } from './editor/plugins/toolbar/block-format/format-quote';

const editorConfig: InitialConfigType = {
	namespace: 'Editor',
	theme: editorTheme,
	nodes: [HeadingNode, ParagraphNode, TextNode, QuoteNode],
	onError: (error: Error) => {
		console.error(error);
	}
};

export default function CustomEditor() {
	return (
		<div className="w-full overflow-hidden rounded-lg border bg-background shadow">
			<LexicalComposer
				initialConfig={{
					...editorConfig
				}}
			>
				<TooltipProvider>
					<Plugins />
				</TooltipProvider>
			</LexicalComposer>
		</div>
	);
}

const placeholder = 'Start typing...';

export function Plugins() {
	const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null);
	console.log(floatingAnchorElem);
	const onRef = (_floatingAnchorElem: HTMLDivElement) => {
		if (_floatingAnchorElem !== null) {
			setFloatingAnchorElem(_floatingAnchorElem);
		}
	};

	return (
		<div className="relative">
			{/* toolbar plugins */}
			<ToolbarPlugin>
				{() => (
					<div className="vertical-align-middle sticky top-0 z-10 flex gap-2 overflow-auto border-b p-1">
						<HistoryToolbarPlugin />
						<BlockFormatDropDown>
							<FormatParagraph />
							<FormatHeading levels={['h1', 'h2', 'h3']} />
							<FormatNumberedList />
							<FormatBulletedList />
							<FormatCheckList />
							<FormatQuote />
						</BlockFormatDropDown>
					</div>
				)}
			</ToolbarPlugin>

			<div className="relative">
				<RichTextPlugin
					contentEditable={
						<div className="">
							<div className="" ref={onRef}>
								<ContentEditable
									placeholder={placeholder}
									className="ContentEditable__root relative block min-h-72 overflow-auto min-h-full px-8 py-4 focus:outline-none h-72"
								/>
							</div>
						</div>
					}
					ErrorBoundary={LexicalErrorBoundary}
				/>
				<HistoryPlugin />
				{/* rest of the plugins */}
			</div>
		</div>
	);
}
