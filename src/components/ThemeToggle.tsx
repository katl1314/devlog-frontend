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
	return (
		<div
			className="hidden cursor-pointer lg:inline-block bottom-[45px] fixed right-[20px] rounded-[50%] border-1 p-2"
			onClick={toggleTheme}
		>
			{theme === 'dark' ? <MdSunny size={45} fill="gray" /> : <MdNightlightRound size={45} fill="gray" />}
		</div>
	);
}
