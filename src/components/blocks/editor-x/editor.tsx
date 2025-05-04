'use client';

import { InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { EditorState, SerializedEditorState } from 'lexical';

import { FloatingLinkContext } from '@/components/editor/context/floating-link-context';
import { SharedAutocompleteContext } from '@/components/editor/context/shared-autocomplete-context';
import { editorTheme } from '@/components/editor/themes/editor-theme';
import { TooltipProvider } from '@/components/ui/tooltip';

import { nodes } from './nodes';
import { Plugins } from './plugins';

import { $generateHtmlFromNodes } from '@lexical/html';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';

const editorConfig: InitialConfigType = {
	namespace: 'Editor',
	theme: editorTheme,
	nodes,
	onError: (error: Error) => {
		console.error(error);
	}
};

export function Editor({
	editorState,
	editorSerializedState,
	onChange,
	onSerializedChange,
	onHtmlChange
}: {
	editorState?: EditorState;
	editorSerializedState?: SerializedEditorState;
	onChange?: (editorState: EditorState) => void;
	onSerializedChange?: (editorSerializedState: SerializedEditorState) => void;
	onHtmlChange?: (html: string) => void;
}) {
	return (
		<div className="overflow-hidden rounded-lg border bg-background shadow">
			<LexicalComposer
				initialConfig={{
					...editorConfig,
					...(editorState ? { editorState } : {}),
					...(editorSerializedState ? { editorState: JSON.stringify(editorSerializedState) } : {})
				}}
			>
				<TooltipProvider>
					<SharedAutocompleteContext>
						<FloatingLinkContext>
							<Plugins />

							<OnChangePlugin
								ignoreSelectionChange={true}
								onChange={editorState => {
									onChange?.(editorState);
									onSerializedChange?.(editorState.toJSON());
								}}
							/>
							<HtmlExportPlugin onHtmlChange={onHtmlChange} />
						</FloatingLinkContext>
					</SharedAutocompleteContext>
				</TooltipProvider>
			</LexicalComposer>
		</div>
	);
}

function HtmlExportPlugin({ onHtmlChange }: { onHtmlChange?: (html: string) => void }) {
	const [editor] = useLexicalComposerContext();

	useEffect(() => {
		if (!onHtmlChange) return;

		const updateHtml = () => {
			editor.update(() => {
				const html = $generateHtmlFromNodes(editor, null);
				onHtmlChange(html);
			});
		};

		// 초기 변환
		updateHtml();

		return editor.registerUpdateListener(({ editorState }) => {
			updateHtml();
		});
	}, [editor, onHtmlChange]);

	return null;
}
