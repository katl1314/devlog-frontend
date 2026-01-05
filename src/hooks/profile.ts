import { User } from '@/types/type';
import { create } from 'zustand';

interface ProfileType extends User {
	isLoggedIn: boolean;
	login: () => void;
	logout: () => void;

	setAvatarUrl: (url: string | null | undefined) => void;
	setId: (id: string | null | undefined) => void;
	setUserName: (username: string | null | undefined) => void;
	setUserId: (userId: string | null | undefined) => void;
}

export const useProfile = create<ProfileType>(set => ({
	avatar_url: '',
	id: '',
	username: '',
	userId: '',
	isLoggedIn: false,
	login: () => set({ isLoggedIn: true }),
	logout: () => set({ isLoggedIn: false, avatar_url: '', username: '', id: '' }),
	setAvatarUrl: url => set({ avatar_url: url }),
	setId: id => set({ id: id ?? '' }),
	setUserName: username => set({ username: username ?? '' }),
	setUserId: userId => set({ userId: userId ?? '' })
}));
