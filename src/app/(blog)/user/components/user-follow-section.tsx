'use client';

import { useState } from 'react';
import FollowButton from './follow-button';
import ClientNotOwnerGuard from './client-not-owner-guard';
import FollowListDialog from './follow-list-dialog';

interface UserFollowSectionProps {
	targetUserId: string;
	initialFollowerCount: number;
	initialFollowingCount: number;
}

export default function UserFollowSection({
	targetUserId,
	initialFollowerCount,
	initialFollowingCount
}: UserFollowSectionProps) {
	const [followerCount, setFollowerCount] = useState(initialFollowerCount);

	const handleFollowChange = (following: boolean) => {
		setFollowerCount(prev => (following ? prev + 1 : prev - 1));
	};

	return (
		<div className="flex items-center justify-between w-full text-sm">
			<div className="flex items-center gap-4 text-muted-foreground">
				<FollowListDialog type="followers" targetUserId={targetUserId} count={followerCount} label="팔로워" />
				<FollowListDialog type="followings" targetUserId={targetUserId} count={initialFollowingCount} label="팔로잉" />
			</div>
			<ClientNotOwnerGuard ownerId={targetUserId}>
				<FollowButton targetUserId={targetUserId} onFollowChange={handleFollowChange} />
			</ClientNotOwnerGuard>
		</div>
	);
}
