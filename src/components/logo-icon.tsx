import { useId } from 'react';

interface ILogoIcon {
	size?: number;
}

export default function LogoIcon({ size = 32 }: ILogoIcon) {
	const uid = useId().replace(/:/g, '');
	const gradId = `logo-icon-grad-${uid}`;

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
					<stop offset="0%" stopColor="#3b82f6" />
					<stop offset="100%" stopColor="#8b5cf6" />
				</linearGradient>
			</defs>
			<rect width="32" height="32" rx="8" fill={`url(#${gradId})`} />
			<path d="M19 3L10 17L16 17L12 29L22 15L16 15Z" fill="white" />
		</svg>
	);
}
