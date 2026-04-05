'use client';

import { Themes, useTheme } from '@/hooks/theme';
import { useEffect } from 'react';

interface ThemeProviderProps {
	initialTheme?: Themes;
}

export default function ThemeProvider({ initialTheme = 'system' }: ThemeProviderProps) {
	const { setTheme } = useTheme();

	useEffect(() => {
		setTheme(initialTheme);
	}, [initialTheme, setTheme]);

	return null;
}
