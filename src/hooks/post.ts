import { create } from 'zustand';

const initialState = {
	title: '',
	content: '',
	tags: [] as string[],
	thumbnail: '',
	visibility: true,
	summary: '',
	path: '',
	file: null as File | null,
	seriesId: null as string | null
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
	seriesId: string | null;
	setTitle: (title: string) => void;
	setContent: (content: string) => void;
	setTags: (tags: string[]) => void;
	setThumbnail: (thumbnail: string) => void;
	setVisibility: (visibility: boolean) => void;
	setSummary: (summary: string) => void;
	setPath: (path: string) => void;
	setFile: (file: File) => void;
	setSeriesId: (seriesId: string | null) => void;
	initialize: (post: Partial<typeof initialState>) => void;
	reset: () => void;
	getFormData: (postId?: string) => FormData;
}

export const usePost = create<Post>((set, get) => ({
	...initialState,
	setTitle: title => set({ title }),
	setContent: content => set({ content }),
	setTags: tags => set({ tags }),
	setThumbnail: thumbnail => set({ thumbnail }),
	setVisibility: visibility => set({ visibility }),
	setSummary: summary => set({ summary }),
	setPath: path => set({ path }),
	setFile: file => set({ file }),
	setSeriesId: seriesId => set({ seriesId }),
	initialize: post => set({ ...initialState, ...post }),
	reset: () => set(initialState),
	getFormData: (postId?: string) => {
		const formData = new FormData();
		const { title, content, tags, thumbnail, visibility, summary, path, file, seriesId } = get();

		formData.set('title', title);
		formData.set('content', content);
		formData.set('tags', JSON.stringify(tags));
		formData.set('thumbnail', thumbnail);
		formData.set('visibility', String(visibility));
		formData.set('summary', summary);
		formData.set('path', path ? `/${path}` : `/${title}`);
		formData.set('file', file ?? '');
		seriesId && formData.set('series_id', seriesId);
		postId && formData.set('id', postId);
		return formData;
	}
}));
