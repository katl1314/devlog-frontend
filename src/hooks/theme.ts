'use client';
import { create } from 'zustand';

export type Themes = 'dark' | 'light' | 'system';

interface Theme {
	theme: Themes;
	setTheme: (theme: Themes) => void;
}

function applyTheme(theme: Themes) {
	const resolved =
		theme === 'system'
			? window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light'
			: theme;

	const prev = resolved === 'dark' ? 'light' : 'dark';
	document.documentElement.classList.add(resolved);
	document.documentElement.classList.remove(prev);
	document.body.classList.add(resolved);
	document.body.classList.remove(prev);
}

const _useTheme = create<Theme>(set => ({
	theme: 'system',
	setTheme: theme => {
		applyTheme(theme);
		set({ theme });
	}
}));

export const useTheme: () => Theme = () => {
	const { theme, setTheme } = _useTheme();
	return { theme, setTheme };
};
