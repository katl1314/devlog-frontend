import Link from 'next/link';

export default function TagView({ tags }: { tags: string[] }) {
	return (
		<div id="tags" className="flex flex-wrap gap-2">
			{tags.map(tag => (
				<div
					key={tag}
					className="border-1 bg-gray-100 rounded-md px-2 py-1 active:outline cursor-pointer group hover:bg-neutral-200 text-sm"
				>
					<Link href="#">{tag}</Link>
				</div>
			))}
		</div>
	);
}
