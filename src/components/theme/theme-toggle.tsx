'use client';
import { useTheme } from '@/hooks/theme';
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
		<>
			{theme === 'dark' ? (
				<CiDark
					size={38}
					fill={fill}
					onClick={toggleTheme}
					className="cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-full p-0.5"
				/>
			) : (
				<CiLight
					size={38}
					fill={fill}
					onClick={toggleTheme}
					className="cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-full p-0.5"
				/>
			)}
		</>
	);
}
