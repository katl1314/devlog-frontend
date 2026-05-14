'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { userService } from '@/services/user.service';

interface FollowButtonProps {
	targetUserId: string;
	onFollowChange?: (following: boolean) => void;
}

export default function FollowButton({ targetUserId, onFollowChange }: FollowButtonProps) {
	const { data: session } = useSession();
	const [following, setFollowing] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!session?.accessToken) return;
		userService
			.getFollowStatus(targetUserId, session.accessToken)
			.then(({ following }) => setFollowing(following))
			.catch(() => {});
	}, [targetUserId, session?.accessToken]);

	const handleClick = async () => {
		if (!session?.accessToken || loading) return;
		setLoading(true);
		try {
			const result = following
				? await userService.unfollow(targetUserId, session.accessToken)
				: await userService.follow(targetUserId, session.accessToken);
			setFollowing(result.following);
			onFollowChange?.(result.following);
		} catch {
			// 실패 시 상태 유지
		} finally {
			setLoading(false);
		}
	};

	return (
		<Button
			variant={following ? 'outline' : 'default'}
			size="sm"
			className={`font-semibold cursor-pointer ${!following ? 'dark:bg-neutral-300 dark:text-neutral-900 dark:hover:bg-neutral-300' : ''}`}
			onClick={handleClick}
			disabled={loading}
		>
			{following ? '언팔로우' : '팔로우'}
		</Button>
	);
}
