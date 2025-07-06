'use client';
import { useTheme } from '@/store/theme';
import { CiLight, CiDark } from 'react-icons/ci';

export default function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const toggleTheme = () => {
		if (theme === 'dark') {
			setTheme('light');
		} else {
			setTheme('dark');
		}
	};

	const fill = theme === 'dark' ? 'white' : 'black';
	return (
		<div onClick={toggleTheme}>
			{theme === 'dark' ? (
				<CiDark size={32} fill={fill} className="cursor-pointer" />
			) : (
				<CiLight size={32} fill={fill} className="cursor-pointer" />
			)}
		</div>
	);
}
