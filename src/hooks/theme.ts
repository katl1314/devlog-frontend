'use client';
import { create } from 'zustand';

export type Themes = 'dark' | 'light';

interface Theme {
	theme: Themes;
	setTheme: (theme: Themes) => void;
}

const _useTheme = create<Theme>(set => ({
	theme: 'light',
	setTheme: theme => {
		localStorage.setItem('theme', theme);
		set({ theme });
		const htmlEl = document.documentElement;
		const bodyEl = document.body;
		if (theme) {
			const prevClass = theme === 'dark' ? 'light' : 'dark';
			htmlEl.classList.add(theme);
			htmlEl.classList.remove(prevClass);
			bodyEl.classList.add(theme);
			bodyEl.classList.remove(prevClass);
		}
	}
}));

// 커스텀 훅
export const useTheme: () => Theme = () => {
	const { theme, setTheme } = _useTheme();

	return { theme, setTheme };
};
