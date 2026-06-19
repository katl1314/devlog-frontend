import PostOwnerActionButton from './post-owner-action-button';
import OwnerOnly from '@/components/owner-only';
import PostActions from './post-actions';
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
	hasThumbnail?: boolean;
}

export default function PostHeader({ title, created_at, tags = [], user, isModal, hasThumbnail = false }: PostHeaderProps) {
	const { avatar_url, user_id } = user;
	return (
		<section className="mb-6 border-b border-border">
			{!hasThumbnail && (
				<div className="w-full h-80 relative bg-linear-to-br from-slate-700 via-slate-600 to-slate-500 flex flex-col justify-end p-8 mb-4">
					{tags.length > 0 && (
						<div className="flex flex-wrap gap-2 mb-3">
							{tags.map((tag: any, i: number) => (
								<span key={i} className="text-xs bg-white/20 text-white px-3 py-1 rounded-full font-medium backdrop-blur-sm">
									#{tag.name}
								</span>
							))}
						</div>
					)}
					<h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight break-keep mb-3">{title}</h1>
					<p className="text-sm text-white/75 font-medium">{user.user_name} · {getTimeDiff(created_at)}</p>
				</div>
			)}
			<div className="flex items-center mb-4 px-4">
				<PostActions />
				<OwnerOnly userId={user_id}>
					<div className="w-px h-4 bg-border mx-2 shrink-0" />
					<PostOwnerActionButton />
				</OwnerOnly>
			</div>
		</section>
	);
}
