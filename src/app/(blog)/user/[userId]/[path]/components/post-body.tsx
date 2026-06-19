import UserProfile from '@/app/(blog)/user/components/user-profile';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

export default function PostBody(post: any) {
	const dummyMarkdown = post.content;
	return (
		<div className="flex relative flex-col">
			<main id="content__entry_point" className="flex-1 w-full min-w-0 pb-8 px-4">
				<MarkdownView content={dummyMarkdown} />
				<UserProfile {...post.user} />
			</main>
		</div>
	);
}

const MarkdownView = ({ content }: { content: string }) => {
	return (
		<ReactMarkdown
			components={{
				h1: ({ ...props }) => <h1 className="text-4xl font-bold mt-6 mb-4 text-foreground" {...props} />,
				h2: ({ ...props }) => <h2 className="text-3xl font-bold mt-6 mb-4 text-foreground" {...props} />,
				h3: ({ ...props }) => <h3 className="text-2xl font-bold mt-4 mb-4 text-foreground" {...props} />,
				h4: ({ ...props }) => <h4 className="text-xl font-bold mt-4 mb-3 text-foreground" {...props} />,
				p: ({ ...props }) => <p className="mb-6 leading-relaxed text-foreground" {...props} />,
				blockquote: ({ ...props }) => (
					<blockquote
						className="border-l-4 border-[#12b886] bg-muted p-4 my-6 text-muted-foreground rounded-r"
						{...props}
					/>
				),
				ul: ({ ...props }) => <ul className="list-disc pl-6 mb-6 space-y-2" {...props} />,
				ol: ({ ...props }) => <ol className="list-decimal pl-6 mb-6 space-y-2" {...props} />,
				li: ({ ...props }) => <li className="leading-relaxed text-foreground" {...props} />,
				pre: ({ ...props }) => (
					<pre
						className="px-3 py-2 text-[0.95rem] font-[monospace] bg-[#212529] text-[#f8f9fa] rounded-[8px] overflow-x-auto mb-[1.5rem]"
						{...props}
					/>
				),
				code: ({ className, children, ...props }) => {
					const isBlock = className?.includes('language-');
					return isBlock ? (
						<code className={className} {...props}>{children}</code>
					) : (
						<code className="px-1.5 py-0.5 bg-muted text-[0.9rem] font-[monospace] rounded" {...props}>{children}</code>
					);
				},
				hr: ({ ...props }) => <hr className="my-8 border-border" {...props} />,
				strong: ({ ...props }) => <strong className="font-bold text-foreground" {...props} />,
				em: ({ ...props }) => <em className="italic text-foreground" {...props} />,
				a: ({ ...props }) => (
					<a
						className="text-foreground font-medium hover:text-foreground/70 hover:underline transition-colors duration-200"
						{...props}
					/>
				),
				img: ({ src, alt }) =>
					src?.startsWith('/api/image/') ? (
						<Image
							src={src}
							alt={alt ?? ''}
							width={0}
							height={0}
							sizes="100vw"
							className="w-full h-auto my-4 rounded"
						/>
					) : (
						// eslint-disable-next-line @next/next/no-img-element
						<img src={src} alt={alt ?? ''} className="max-w-full h-auto my-4 rounded" />
					),
			}}
		>
			{content}
		</ReactMarkdown>
	);
};
