'use client';
import { useProfile } from '@/store/profile';
import { Profile } from '@/types/type';
import { useEffect } from 'react';

interface UserInit {
	children: React.ReactNode;
	user: Profile;
}

export default function UserInit({ children, user }: UserInit) {
	const { isLoggedIn, login, setAvatarUrl, setUserName, setId } = useProfile();

	useEffect(() => {
		if (!isLoggedIn && user) {
			login();
			setAvatarUrl(user.avatar_url);
			setUserName(user.username);
			setId(user.id);
		}
	}, [isLoggedIn, login, setAvatarUrl, setUserName, setId, user]);

	return <>{children}</>;
}
