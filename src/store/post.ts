import { create } from 'zustand';

interface Post {
	title: string;
	content: string;
	tags: string[];
	visibility: 'PUBLIC' | 'PRIVATE';
	path: string;
	thumbnail: string;
	summary: string;
	file: File | undefined | null;
	setTitle: (title: string) => void;
	setContent: (content: string) => void;
	setTags: (tags: string[]) => void;
	setThumbnail: (thumbnail: string) => void;
	setVisibility: (visibility: 'PUBLIC' | 'PRIVATE') => void;
	setSummary: (sumary: string) => void;
	setPath: (path: string) => void;
	setFile: (file: File) => void;
	setReset: () => void;
}

export const usePost = create<Post>(set => ({
	title: '',
	content: '',
	tags: [],
	thumbnail: '',
	visibility: 'PUBLIC',
	summary: '',
	path: '',
	file: null,
	setTitle: title => set({ title }),
	setContent: content => set({ content }),
	setTags: tags => set({ tags }),
	setThumbnail: thumbnail => set({ thumbnail }),
	setVisibility: visibility => set({ visibility }),
	setSummary: summary => set({ summary }),
	setPath: path => set({ path }),
	setReset: () =>
		set({
			title: '',
			content: '',
			tags: [],
			thumbnail: '',
			visibility: 'PUBLIC',
			summary: '',
			path: '',
			file: null
		}),
	setFile: file => set({ file })
}));
