import Link from 'next/link';

export default function TagView({ tags }: { tags: string[] }) {
	return (
		<div id="tags" className="flex flex-wrap gap-2">
			{tags.map(tag => (
				<div
					key={tag}
					className="border-1 bg-gray-100 text-neutral-400 rounded-md px-2 py-1 active:outline cursor-pointer text-sm group hover:bg-neutral-200 hover:text-neutral-700"
				>
					<Link href="#">#{tag}</Link>
				</div>
			))}
		</div>
	);
}
