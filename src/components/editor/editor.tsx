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
import ControlPanel from './control-panel';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Link from '@tiptap/extension-link';
import Code from '@tiptap/extension-code';
import CodeBlock from '@tiptap/extension-code-block';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Blockquote from '@tiptap/extension-blockquote';
import Strikethrough from '@tiptap/extension-strike';
import { Markdown } from 'tiptap-markdown';
import { useEffect } from 'react';

interface IEditor {
	name: string;
	content: string;
	placeholder?: string;
	setContent: (content: string) => void;
}

export default function Editor({ name, content, setContent, placeholder = '무엇이든 입력하세요.' }: IEditor) {
	const editor = useEditor({
		immediatelyRender: false,
		extensions: [
			Document,
			Paragraph,
			Text,
			Heading.configure({
				levels: [1, 2, 3, 4]
			}),
			BulletList,
			OrderedList,
			ListItem,
			Bold,
			Italic,
			Code,
			HorizontalRule,
			Blockquote,
			Strikethrough,
			CodeBlock.configure({
				languageClassPrefix: 'language-',
				exitOnArrowDown: true,
				defaultLanguage: 'plaintext'
			}),
			Markdown,
			Placeholder.configure({
				placeholder
			}),
			Link.configure({
				openOnClick: false,
				autolink: true,
				defaultProtocol: 'https',
				protocols: ['https', 'http'],
				isAllowedUri: (url, ctx) => {
					try {
						const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`);

						// use default validation
						if (!ctx.defaultValidate(parsedUrl.href)) {
							return false;
						}

						// 허용하지 않은 프로토콜
						const disallowedProtocols = ['ftp', 'file', 'mnailto'];
						const protocol = parsedUrl.protocol.replace(':', '');

						if (disallowedProtocols.includes(protocol)) {
							return false;
						}

						// only allow protocols specified in ctx.protocols
						const allowedProtocols = ctx.protocols.map(p => (typeof p === 'string' ? p : p.scheme));

						if (!allowedProtocols.includes(protocol)) {
							return false;
						}

						// disallowed domains
						const disallowedDomains = ['example-phishing.com', 'malicious-site.net'];
						const domain = parsedUrl.hostname;

						if (disallowedDomains.includes(domain)) {
							return false;
						}

						// all checks have passed
						return true;
					} catch {
						return false; // 에러 발생하면 false
					}
				},
				shouldAutoLink: url => {
					try {
						// construct URL
						const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`);

						// only auto-link if the domain is not in the disallowed list
						const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com'];
						const domain = parsedUrl.hostname;

						return !disallowedDomains.includes(domain);
					} catch {
						return false;
					}
				}
			})
		],
		content: content,
		onUpdate: function ({ editor }) {
			setContent(editor.storage.markdown.getMarkdown());
		},

		editorProps: {
			attributes: {
				class: 'flex-1 max-h-[calc(100vh-400px)] py-3 overflow-auto'
			}
		}
	});

	useEffect(() => {
		return () => {
			document.body.style.overflow = 'auto';
		};
	});

	return (
		<div className="markdown-body px-3">
			<ControlPanel editor={editor!} />
			<EditorContent name={name} editor={editor} />
		</div>
	);
}
