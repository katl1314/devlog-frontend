import { FaGithub, FaYoutube, FaLinkedin, FaInstagram, FaGlobe } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { CalendarDays } from 'lucide-react';
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

	const activeSocials = SOCIAL_ITEMS.filter(({ key }) => socials?.[key]);
	const hasSocials = activeSocials.length > 0;

	return (
		<div className="p-4 sm:p-6 flex flex-col gap-4 w-full">
			{/* 소개 카드 */}
			<div className="bg-muted border border-border rounded-2xl p-5 sm:p-6">
				<p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">소개</p>
				{description ? (
					<p className="text-sm sm:text-[15px] leading-7 whitespace-pre-wrap">{description}</p>
				) : (
					<p className="text-muted-foreground text-sm">아직 소개가 없습니다.</p>
				)}
			</div>

			{/* 소셜 + 가입일: md 이상에서 2열 */}
			<div className="flex flex-col gap-4">
				{hasSocials && <SocialCard activeSocials={activeSocials} socials={socials} />}
				<div className="bg-muted border border-border rounded-2xl p-5 sm:p-6">
					<p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">가입일</p>
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<CalendarDays size={15} className="shrink-0" />
						<span>{joinDate}</span>
					</div>
				</div>
			</div>
		</div>
	);
}

type SocialItem = { key: keyof Socials; Icon: IconType; label: string };

const SocialCard = ({ activeSocials, socials }: { activeSocials: SocialItem[]; socials?: Socials | null }) => {
	return (
		<div className="bg-muted border border-border rounded-2xl p-5 sm:p-6">
			<p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">소셜</p>
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
