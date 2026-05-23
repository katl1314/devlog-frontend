interface ILogoIcon {
	size?: number;
	variant?: 'dark' | 'white';
}

export default function LogoIcon({ size = 32, variant = 'dark' }: ILogoIcon) {
	if (variant === 'white') {
		// 다크 패널(zinc-950 등) 전용: 반투명 흰색 배경
		return (
			<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 32 32" fill="none">
				<rect width="32" height="32" rx="8" fill="white" fillOpacity="0.12" />
				<path d="M19 3L10 17L16 17L12 29L22 15L16 15Z" fill="white" />
			</svg>
		);
	}

	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 32 32" fill="none">
			<rect width="32" height="32" rx="8" className="fill-[#18181b] dark:fill-white" />
			<path d="M19 3L10 17L16 17L12 29L22 15L16 15Z" className="fill-white dark:fill-zinc-800" />
		</svg>
	);
}
