import { create } from 'zustand';

interface Post {
	title: string;
	content: string;
	tags: string[];
	visibility: 'public' | 'private';
	thumbnail?: string;
	summary?: string;
	setTitle: (title: string) => void;
	setContent: (content: string) => void;
	setTags: (tags: string[]) => void;
	setThumbnail: (thumbnail: string) => void;
	setVisibility: (visibility: 'public' | 'private') => void;
	setSummary: (sumary: string) => void;
}

export const usePost = create<Post>(set => ({
	title: '',
	content: '',
	tags: [],
	thumbnail: '',
	visibility: 'public',
	sumary: '',
	setTitle: title => set({ title }),
	setContent: content => set({ content }),
	setTags: tags => set({ tags }),
	setThumbnail: thumbnail => set({ thumbnail }),
	setVisibility: visibility => set({ visibility }),
	setSummary: summary => set({ summary })
}));
