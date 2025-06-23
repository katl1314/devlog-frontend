'use client';
import { useTheme } from '@/store/theme';
import { MdNightlightRound, MdSunny } from 'react-icons/md';
import styles from './ThemeToggle.module.css';
import { cn } from '@/lib/utils';

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
		<div className={cn(styles.toggle, 'lg:inline-block')} onClick={toggleTheme}>
			{theme === 'dark' ? <MdNightlightRound size={45} fill={fill} /> : <MdSunny size={45} fill={fill} />}
		</div>
	);
}
