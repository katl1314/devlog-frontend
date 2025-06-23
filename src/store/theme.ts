import { create } from 'zustand';

type Themes = 'dark' | 'light';

interface Theme {
	theme: Themes;
	setTheme: (theme: Themes) => void;
}

export const useTheme = create<Theme>(set => ({
	theme: (sessionStorage?.getItem('theme') as Themes) ?? 'light',
	setTheme: theme => {
		sessionStorage.setItem('theme', theme);
		set({ theme });
	}
}));
