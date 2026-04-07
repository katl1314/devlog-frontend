import { create } from 'zustand';

const initialState = {
	title: '',
	content: '',
	tags: [] as string[],
	thumbnail: '',
	visibility: true,
	summary: '',
	path: '',
	file: null as File | null
};

interface Post {
	title: string;
	content: string;
	tags: string[];
	visibility: boolean;
	path: string;
	thumbnail: string;
	summary: string;
	file: File | undefined | null;
	setTitle: (title: string) => void;
	setContent: (content: string) => void;
	setTags: (tags: string[]) => void;
	setThumbnail: (thumbnail: string) => void;
	setVisibility: (visibility: boolean) => void;
	setSummary: (sumary: string) => void;
	setPath: (path: string) => void;
	setFile: (file: File) => void;
	reset: () => void;
}

export const usePost = create<Post>(set => ({
	...initialState,
	setTitle: title => set({ title }),
	setContent: content => set({ content }),
	setTags: tags => set({ tags }),
	setThumbnail: thumbnail => set({ thumbnail }),
	setVisibility: visibility => set({ visibility }),
	setSummary: summary => set({ summary }),
	setPath: path => set({ path }),
	setFile: file => set({ file }),
	reset: () => set(initialState)
}));
