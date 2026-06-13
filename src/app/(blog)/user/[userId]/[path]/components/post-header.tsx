import PostOwnerActionButton from './post-owner-action-button';
import { TagViewer } from '@/components/tag/tag-viewer';
import PostOwnerActions from './post-owner-actions';
import { Label } from '@/components/ui/label';
import PostActions from './post-actions';
import PostAuthorLink from './post-author-link';
import UserAvatar from '@/components/user-avatar';
import { getTimeDiff } from '@/utils';

interface PostHeaderProps {
	title: string;
	path: string;
	tags?: any[];
	created_at: string | Date;
	user: {
		user_id: string;
		user_name: string;
		avatar_url: string;
	};
	isModal: boolean;
}

export default function PostHeader({ title, created_at, tags = [], user, isModal }: PostHeaderProps) {
	const { avatar_url, user_id } = user;
	return (
		<section className="mb-6">
			<h1 className="text-4xl font-extrabold mb-5 leading-tight break-keep text-foreground">{title}</h1>
			<div className="flex justify-between items-center mb-6">
				<div className="flex items-center gap-2.5">
					<UserAvatar src={avatar_url} userId={user_id} className="w-8 h-8" />
					<div className="flex items-center gap-1.5 text-sm text-muted-foreground font-medium">
						<PostAuthorLink userId={user_id} isModal={isModal} />
						<span className="text-border">·</span>
						<Label className="text-muted-foreground font-normal">{getTimeDiff(created_at)}</Label>
					</div>
				</div>
				<PostOwnerActions userId={user_id}>
					<PostOwnerActionButton />
				</PostOwnerActions>
			</div>
			{tags.length > 0 && <TagViewer tags={tags} />}
			<PostActions />
		</section>
	);
}
