'use client';

import { useTheme } from '@/store/theme';
import { useEffect, useRef } from 'react';

export default function ThemeProvider() {
	const { theme, setTheme } = useTheme();
	const html = useRef<HTMLElement>(document.documentElement);
	const body = useRef<HTMLElement>(document.body);
	useEffect(() => {
		setTheme(theme);

		if (theme) {
			const prevClass = theme === 'dark' ? 'light' : 'dark';
			html.current.classList.add(theme); // html 태그에 추가
			html.current.classList.remove(prevClass); // html 태그에 추가
			body.current.classList.add(theme); // body 태그에도 추가
			body.current.classList.remove(prevClass); // body 태그에도 추가
		}
	}, [theme]);

	return null;
}
