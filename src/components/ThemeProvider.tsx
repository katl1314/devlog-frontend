'use client';

import { useTheme } from '@/store/theme';
import { useEffect } from 'react';

export default function ThemeProvider() {
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setTheme(theme);

		if (theme) {
			if (theme === 'dark') {
				document.documentElement.classList.remove('light'); // html 태그에 추가
				document.body.classList.remove('light'); // body 태그에도 추가
			} else {
				document.documentElement.classList.remove('dark'); // html 태그에 추가
				document.body.classList.remove('dark'); // body 태그에도 추가
			}
			document.documentElement.classList.add(theme); // html 태그에 추가
			document.body.classList.add(theme); // body 태그에도 추가
		}
	}, [theme]);

	return null;
}
