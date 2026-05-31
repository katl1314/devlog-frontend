'use client';

import { PostContext } from './post-context-provider';
import { useContext } from 'react';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { cn } from '@/utils';
import { toast } from 'sonner';
import {
	BiHeart,
	BiSolidHeart,
	BiCommentDetail,
	BiLink,
	BiLogoFacebook,
	BiLogoLinkedin,
	BiLogoTwitter
} from 'react-icons/bi';
import { BsThreeDots } from 'react-icons/bs';

export default function PostActions() {
	const { isLiked, likeCount, commentCount, toggleLike } = useContext(PostContext);

	const handleCommentClick = () => {
		document.getElementById('comments')?.scrollIntoView({ behavior: 'smooth' });
	};

	const handleCopyLink = async () => {
		await navigator.clipboard.writeText(window.location.href);
		toast('링크가 복사됐습니다.', { duration: 2000 });
	};

	const handleShareSNS = (platform: 'twitter' | 'facebook' | 'linkedin') => {
		const url = encodeURIComponent(window.location.href);
		const title = encodeURIComponent(document.title);
		const shareUrls = {
			twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
			facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
			linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
		};
		window.open(shareUrls[platform], '_blank', 'noopener,noreferrer');
	};

	return (
		<div className="flex items-center justify-between py-4 border-t border-border mt-5">
			{/* 좌측: 좋아요, 댓글 */}
			<div className="flex items-center gap-4">
				<button
					onClick={toggleLike}
					className={cn(
						'flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors',
						isLiked && 'text-red-500 hover:text-red-400'
					)}
				>
					{isLiked ? <BiSolidHeart size={20} /> : <BiHeart size={20} />}
					<span>{likeCount}</span>
				</button>

				<button
					onClick={handleCommentClick}
					className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
				>
					<BiCommentDetail size={20} />
					<span>{commentCount}</span>
				</button>
			</div>

			{/* 우측: 공유, 더보기 */}
			<div className="flex items-center gap-1">
				{/* <DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
							<ShareIcon />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-48">
						<DropdownMenuItem onClick={handleCopyLink} className="gap-2">
							<BiLink size={16} /> 링크 복사
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={() => handleShareSNS('twitter')} className="gap-2">
							<BiLogoTwitter size={16} /> Twitter / X
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => handleShareSNS('facebook')} className="gap-2">
							<BiLogoFacebook size={16} /> Facebook
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => handleShareSNS('linkedin')} className="gap-2">
							<BiLogoLinkedin size={16} /> LinkedIn
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
							<BsThreeDots size={16} />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-44">
						<DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">신고하기</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu> */}
			</div>
		</div>
	);
}

// const ShareIcon = () => (
// 	<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// 		<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
// 		<polyline points="16 6 12 2 8 6" />
// 		<line x1="12" y1="2" x2="12" y2="15" />
// 	</svg>
// );
