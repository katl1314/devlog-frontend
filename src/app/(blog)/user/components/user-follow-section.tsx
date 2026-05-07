'use client';

import { useState } from 'react';
import FollowButton from './follow-button';
import ClientNotOwnerGuard from './client-not-owner-guard';
import Link from 'next/link';

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
		<div className="flex gap-2 text-sm">
			<div className="flex items-center gap-4 text-muted-foreground">
				<Link href="#">
					<strong className="text-foreground font-semibold">{followerCount}</strong> 팔로워
				</Link>
				<Link href="#">
					<strong className="text-foreground font-semibold">{initialFollowingCount}</strong> 팔로잉
				</Link>
			</div>
			<div className="">
				<ClientNotOwnerGuard ownerId={targetUserId}>
					<FollowButton targetUserId={targetUserId} onFollowChange={handleFollowChange} />
				</ClientNotOwnerGuard>
			</div>
		</div>
	);
}
