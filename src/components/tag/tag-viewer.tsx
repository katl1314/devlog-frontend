import { Label } from '@/components/ui/label';
export const TagViewer = ({ tags }: { tags: string[] }) => {
	return (
		<>
			{tags.length > 0 && (
				<div className="mt-4 flex flex-wrap gap-2">
					{tags.map((tag, index) => (
						<Label
							key={`${tag}-${index}`}
							className="inline-block bg-muted text-[#12b886] px-3 py-1 rounded-lg text-sm font-medium cursor-pointer hover:bg-muted/70 transition-colors"
						>
							#{tag}
						</Label>
					))}
				</div>
			)}
		</>
	);
};
