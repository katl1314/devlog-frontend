'use client';
import { useId } from 'react';
import { useTheme } from '@/hooks/theme';

export default function NavbarLogo() {
	const { theme } = useTheme();
	const uid = useId().replace(/:/g, '');
	const gradId = `logo-grad-${uid}`;
	const textColor = theme === 'dark' ? '#f9fafb' : '#0f172a';

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="120"
			height="32"
			viewBox="0 0 120 32"
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
					<stop offset="0%" stopColor="#3b82f6" />
					<stop offset="100%" stopColor="#8b5cf6" />
				</linearGradient>
			</defs>

			{/* 그라디언트 아이콘 박스 */}
			<rect width="32" height="32" rx="8" fill={`url(#${gradId})`} />

			{/* 번개 볼트 아이콘 */}
			<path d="M19 3L10 17L16 17L12 29L22 15L16 15Z" fill="white" />

			{/* Lumina 텍스트 */}
			<text
				x="40"
				y="22"
				fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
				fontSize="22"
				fontWeight="700"
				letterSpacing="-0.4"
				fill={textColor}
			>
				Dev.Log
			</text>
		</svg>
	);
}
