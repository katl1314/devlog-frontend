import { Label } from '@/components/ui/label';

interface Tag {
	id: string;
	name: string;
}

export const TagViewer = ({ tags }: { tags: Tag[] }) => {
	return (
		<>
			{tags.length > 0 && (
				<div className="mt-4 flex flex-wrap gap-2">
					{tags.map((tag, index) => (
						<Label
							key={`${tag}-${index}`}
							className="inline-block bg-muted text-foreground px-3 py-1 rounded-lg text-sm font-medium cursor-pointer hover:bg-muted/70 transition-colors"
						>
							#{tag.name}
						</Label>
					))}
				</div>
			)}
		</>
	);
};
