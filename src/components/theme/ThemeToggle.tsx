'use client';
import { useTheme } from '@/store/theme';
import { MdNightlightRound, MdSunny } from 'react-icons/md';

export default function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const toggleTheme = () => {
		if (theme === 'dark') {
			setTheme('light');
		} else {
			setTheme('dark');
		}
	};

	const fill = theme === 'dark' ? 'white' : 'gray';
	return (
		<div onClick={toggleTheme}>
			{theme === 'dark' ? <MdNightlightRound size={32} fill={fill} /> : <MdSunny size={32} fill={fill} />}
		</div>
	);
}
