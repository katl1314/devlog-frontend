import { useId } from 'react';

interface ILogoIcon {
	size?: number;
	variant?: 'dark' | 'white';
}

export default function LogoIcon({ size = 32, variant = 'dark' }: ILogoIcon) {
	const uid = useId().replace(/:/g, '');
	const gradId = `logo-icon-grad-${uid}`;

	if (variant === 'white') {
		// 다크 패널(zinc-950 등) 전용: 반투명 흰색 배경
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 32 32"
				fill="none"
			>
				<rect width="32" height="32" rx="8" fill="white" fillOpacity="0.12" />
				<path d="M19 3L10 17L16 17L12 29L22 15L16 15Z" fill="white" />
			</svg>
		);
	}

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 32 32"
			fill="none"
		>
			<defs>
				<linearGradient
					id={gradId}
					x1="0"
					y1="0"
					x2="1"
					y2="1"
					gradientUnits="objectBoundingBox"
				>
					<stop offset="0%" stopColor="#27272a" />
					<stop offset="100%" stopColor="#18181b" />
				</linearGradient>
			</defs>
			{/* 라이트 모드: 다크 그라디언트 배경 */}
			<rect width="32" height="32" rx="8" fill={`url(#${gradId})`} className="dark:hidden" />
			{/* 다크 모드: 밝은 배경 */}
			<rect width="32" height="32" rx="8" fill="white" fillOpacity="0.9" className="hidden dark:block" />
			<path d="M19 3L10 17L16 17L12 29L22 15L16 15Z" className="fill-white dark:fill-zinc-800" />
		</svg>
	);
}
