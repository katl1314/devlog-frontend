import Image from 'next/image';
import { getTimeDiff } from '@/utils';

interface ThumbnailProps {
	thumbnail: string | null | undefined;
	title?: string;
	tags?: { id: string; name: string }[];
	user?: { user_id: string; user_name: string; avatar_url: string };
	created_at?: string | Date;
}

export default function Thumbnail({ thumbnail, title, tags = [], user, created_at }: ThumbnailProps) {
	if (!thumbnail) return <></>;
	const src = thumbnail.startsWith('/') ? thumbnail : `/api/image/${thumbnail}`;
	return (
		<div className="w-full h-80 relative overflow-hidden mb-4">
			<Image src={src} alt="썸네일 이미지" fill className="object-cover" />
			<div className="absolute inset-0 bg-linear-to-b from-black/10 to-black/60" />
			<div className="absolute inset-0 flex flex-col justify-end p-8">
				{tags.length > 0 && (
					<div className="flex flex-wrap gap-2 mb-3">
						{tags.map((tag, i) => (
							<span key={i} className="text-xs bg-white/20 text-white px-3 py-1 rounded-full font-medium backdrop-blur-sm">
								#{tag.name}
							</span>
						))}
					</div>
				)}
				{title && (
					<h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight break-keep mb-3">
						{title}
					</h1>
				)}
				{user && created_at && (
					<p className="text-sm text-white/75 font-medium">
						{user.user_name} · {getTimeDiff(created_at)}
					</p>
				)}
			</div>
		</div>
	)
}
