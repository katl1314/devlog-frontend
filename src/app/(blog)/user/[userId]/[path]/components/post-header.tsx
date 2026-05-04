import PostOwnerActionButton from './post-owner-action-button';
import { TagViewer } from '@/components/tag/tag-viewer';
import PostOwnerActions from './post-owner-actions';
import { Label } from '@/components/ui/label';
import PostActions from './post-actions';
import PostAuthorLink from './post-author-link';
import { getTimeDiff } from '@/utils';

interface PostHeaderProps {
	title: string;
	path: string;
	user_id: string;
	tags?: any[];
	created_at: string | Date;
	user?: {
		user_id: string;
		user_name: string;
		avatar_url: string;
	};
	isModal: boolean;
}

export default function PostHeader({ title, created_at, tags = [], user_id, isModal }: PostHeaderProps) {
	return (
		<section className="mb-8">
			<h1 className="text-4xl font-extrabold mb-6 leading-tight break-keep text-foreground">{title}</h1>
			<div className="flex justify-between items-center text-base mb-4">
				<div className="flex items-center text-muted-foreground font-medium">
					<PostAuthorLink userId={user_id} isModal={isModal} />
					<Label className="mx-2 text-border">·</Label>
					<Label className="text-muted-foreground">{getTimeDiff(created_at)}</Label>
				</div>
				<PostOwnerActions userId={user_id}>
					<PostOwnerActionButton />
				</PostOwnerActions>
			</div>
			<TagViewer tags={tags} />
			<PostActions />
		</section>
	);
}
