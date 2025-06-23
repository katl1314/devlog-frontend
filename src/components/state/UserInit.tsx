'use client';
import { useProfile } from '@/store/profile';
import { User } from '@/types/type';
import { useEffect, useState } from 'react';

interface IUserInit {
	children: React.ReactNode;
	user: User;
}

export default function UserInit({ children, user }: IUserInit) {
	const { isLoggedIn, login, setAvatarUrl, setUserName, setId, setUserId } = useProfile();

	useEffect(() => {
		if (!isLoggedIn && user) {
			login();
			const { avatar_url, username, id, userId } = user;
			setAvatarUrl(avatar_url);
			setUserName(username);
			setId(id);
			setUserId(userId);
		}
	}, [isLoggedIn, login, setAvatarUrl, setUserName, setUserId, setId, user]);

	return <>{children}</>;
}
