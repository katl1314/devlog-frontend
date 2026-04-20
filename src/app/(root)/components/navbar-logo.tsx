'use client';
import LogoIcon from '@/components/logo-icon';
import Logo from '@/components/logo';

export default function NavbarLogo() {
	return (
		<div className="inline-flex items-center align-middle">
			{/* md 해상도에서는 아이콘만, 그 외에는 풀 로고 */}
			<span className="hidden md:inline xl:hidden">
				<LogoIcon size={32} />
			</span>
			<span className="inline md:hidden xl:inline">
				<Logo size={32} />
			</span>
		</div>
	);
}
