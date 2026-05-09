import UserAvatar from '@/components/user-avatar';
import { FaGithub, FaYoutube, FaLinkedin, FaInstagram, FaGlobe } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import UserFollowSection from './user-follow-section';
import Link from 'next/link';
import { IconType } from 'react-icons';

interface Socials {
	github?: string;
	twitter?: string;
	website?: string;
	youtube?: string;
	linkedin?: string;
	instagram?: string;
}

interface UserProfileSectionProps {
	user_id: string;
	user_name: string;
	avatar_url: string;
	blog?: { description?: string };
	followerCount: number;
	followingCount: number;
	socials?: Socials;
}

const SOCIAL_ICONS: { key: keyof Socials; Icon: IconType }[] = [
	{ key: 'github', Icon: FaGithub },
	{ key: 'twitter', Icon: FaXTwitter },
	{ key: 'website', Icon: FaGlobe },
	{ key: 'youtube', Icon: FaYoutube },
	{ key: 'linkedin', Icon: FaLinkedin },
	{ key: 'instagram', Icon: FaInstagram },
];

export default function UserProfileSection({
	user_id,
	user_name,
	avatar_url,
	blog,
	followerCount,
	followingCount,
	socials
}: UserProfileSectionProps) {
	return (
		<div className="px-4 pt-8 pb-5">
			<div className="flex items-center gap-5 mb-5">
				<UserAvatar src={avatar_url} userId={user_id} className="w-20 h-20 lg:w-24 lg:h-24 shrink-0" />
				<div className="flex flex-col gap-1">
					<span className="text-xl font-bold leading-tight">{user_name}</span>
					<span className="text-sm text-muted-foreground">@{user_id}</span>
					{blog?.description && <span className="text-sm text-muted-foreground">{blog.description}</span>}
				</div>
			</div>

			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3 text-muted-foreground">
					{SOCIAL_ICONS.map(({ key, Icon }) => {
						const href = socials?.[key];
						if (!href) return null;
						return <SocialLink key={key} href={href} Icon={Icon} />;
					})}
				</div>
				<UserFollowSection
					targetUserId={user_id}
					initialFollowerCount={followerCount}
					initialFollowingCount={followingCount}
				/>
			</div>
		</div>
	);
}

const SocialLink = ({ href, Icon }: { href: string; Icon: IconType }) => {
	return (
		<Link href={href} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors cursor-pointer">
			<Icon size={22} />
		</Link>
	);
};