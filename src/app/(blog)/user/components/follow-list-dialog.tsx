'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { userService } from '@/services/user.service';
import UserAvatar from '@/components/user-avatar';
import Link from 'next/link';

type FollowUser = { user_id: string; user_name: string; avatar_url: string };

interface FollowListDialogProps {
	type: 'followers' | 'followings';
	targetUserId: string;
	count: number;
	label: string;
}

export default function FollowListDialog({ type, targetUserId, count, label }: FollowListDialogProps) {
	const [open, setOpen] = useState(false);
	const [users, setUsers] = useState<FollowUser[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!open) return;
		setLoading(true);
		const fetch = type === 'followers'
			? userService.getFollowers(targetUserId)
			: userService.getFollowings(targetUserId);
		fetch
			.then(setUsers)
			.finally(() => setLoading(false));
	}, [open, type, targetUserId]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="ghost" className="h-auto p-0 text-sm font-normal hover:underline hover:bg-transparent">
					<strong className="text-foreground font-semibold">{count}</strong> {label}
				</Button>
			</DialogTrigger>
			<DialogContent className="flex flex-col gap-0 p-0 sm:max-w-lg h-[85vh] sm:h-150">
				<DialogHeader className="px-6 pt-6 pb-4 border-b shrink-0">
					<DialogTitle>{label}</DialogTitle>
				</DialogHeader>
				<div className="flex-1 overflow-y-auto px-3 py-3">
					{loading && (
						<p className="text-sm text-muted-foreground text-center py-10">불러오는 중...</p>
					)}
					{!loading && users.length === 0 && (
						<p className="text-sm text-muted-foreground text-center py-10">
							{type === 'followers' ? '아직 팔로워가 없습니다.' : '팔로잉하는 사람이 없습니다.'}
						</p>
					)}
					{users.map(user => (
						<Link
							key={user.user_id}
							href={`/user/${user.user_id}`}
							onClick={() => setOpen(false)}
							className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-muted transition-colors cursor-pointer"
						>
							<UserAvatar src={user.avatar_url} userId={user.user_id} className="w-11 h-11 shrink-0" />
							<div className="flex flex-col min-w-0">
								<span className="text-sm font-medium truncate">{user.user_name}</span>
								<span className="text-xs text-muted-foreground truncate">@{user.user_id}</span>
							</div>
						</Link>
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
}
