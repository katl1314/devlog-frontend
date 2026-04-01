'use client';
import { useTheme } from '@/hooks/theme';
import LogoIcon from '@/components/logo-icon';

export default function NavbarLogo() {
	const { theme } = useTheme();
	const textColor = theme === 'dark' ? 'text-gray-50' : 'text-slate-900';

	return (
		<div className="inline-flex items-center gap-2">
			<LogoIcon size={32} />
			<span
				className={`text-[22px] font-bold tracking-tight leading-none ${textColor}`}
				style={{ letterSpacing: '-0.4px' }}
			>
				Dev.Log
			</span>
		</div>
	);
}
