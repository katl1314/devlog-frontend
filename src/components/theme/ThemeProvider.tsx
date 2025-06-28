'use client';

import { Themes, useTheme } from '@/store/theme';
import { useEffect } from 'react';

export default function ThemeProvider() {
	const { theme, setTheme } = useTheme();
	useEffect(() => {
		const newTheme = (localStorage.getItem('theme') as Themes) ?? theme;
		setTheme(newTheme);
	}, [setTheme, theme]);

	return null;
}
