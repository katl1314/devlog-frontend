import { FaGithub, FaYoutube, FaLinkedin, FaInstagram, FaGlobe } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { CalendarDays } from 'lucide-react';
import Link from 'next/link';
import { IconType } from 'react-icons';
import { Nullable } from '@/types/global';

interface Socials {
	github?: string;
	twitter?: string;
	website?: string;
	youtube?: string;
	linkedin?: string;
	instagram?: string;
}

interface UserAboutSectionProps {
	description?: string | null;
	socials?: Socials | null;
	created_at: string;
}

const SOCIAL_ITEMS: { key: keyof Socials; Icon: IconType; label: string }[] = [
	{ key: 'github', Icon: FaGithub, label: 'GitHub' },
	{ key: 'twitter', Icon: FaXTwitter, label: 'X (Twitter)' },
	{ key: 'website', Icon: FaGlobe, label: '웹사이트' },
	{ key: 'youtube', Icon: FaYoutube, label: 'YouTube' },
	{ key: 'linkedin', Icon: FaLinkedin, label: 'LinkedIn' },
	{ key: 'instagram', Icon: FaInstagram, label: 'Instagram' }
];

export default function UserAboutSection({ description, socials, created_at }: UserAboutSectionProps) {
	const joinDate = new Date(created_at).toLocaleDateString('ko-KR', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	return (
		<div className="px-4 py-8 max-w-2xl flex flex-col gap-4">
			{/* 소개 카드 */}
			<div className="bg-muted border border-border rounded-2xl shadow-sm p-5">
				<p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">소개</p>
				{description ? (
					<p className="text-[15px] leading-7 whitespace-pre-wrap">{description}</p>
				) : (
					<p className="text-muted-foreground italic text-sm">아직 소개가 없습니다.</p>
				)}
			</div>

			{/* 소셜 카드 */}
			<SocialCard socials={socials} />
			{/* 가입일 카드 */}
			<div className="bg-muted border border-border rounded-2xl shadow-sm px-5 py-4 flex items-center gap-2 text-sm text-muted-foreground">
				<CalendarDays size={15} />
				<span>{joinDate} 가입</span>
			</div>
		</div>
	);
}

const SocialCard = ({ socials }: { socials?: Socials | null }) => {
	const activeSocials = SOCIAL_ITEMS.filter(({ key }) => socials?.[key]);
	if (activeSocials.length < 1) return <></>;

	return (
		<div className="bg-muted border border-border rounded-2xl shadow-sm p-5">
			<p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">소셜</p>
			<div className="flex flex-wrap gap-2">
				{activeSocials.map(({ key, Icon, label }) => (
					<Link
						key={key}
						href={socials![key]!}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-2 px-4 py-2 rounded-full bg-background hover:bg-background/70 text-sm font-medium transition-colors cursor-pointer"
					>
						<Icon size={15} />
						<span>{label}</span>
					</Link>
				))}
			</div>
		</div>
	);
};
