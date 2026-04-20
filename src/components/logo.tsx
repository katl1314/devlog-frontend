import { useId } from 'react';

interface ILogo {
	size?: number;
	variant?: 'dark' | 'white';
	className?: string;
}

const FONT_FAMILY =
	"ui-monospace, 'JetBrains Mono', 'Fira Code', 'SFMono-Regular', Menlo, Consolas, monospace";
const VB_HEIGHT = 32;
const VB_WIDTH = 148;

export default function Logo({
	size = 32,
	variant = 'dark',
	className
}: ILogo) {
	const width = (size * VB_WIDTH) / VB_HEIGHT;

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={size}
			viewBox={`0 0 ${VB_WIDTH} ${VB_HEIGHT}`}
			fill="none"
			className={className}
		>
			{variant === 'dark' ? <DarkThemeLogo /> : <WhiteThemeLogo />}
		</svg>
	);
}

const WhiteThemeLogo = () => {
	return (
		<>
			<rect width="32" height="32" rx="8" fill="white" fillOpacity="0.12" />
			<path d="M19 3L10 17L16 17L12 29L22 15L16 15Z" fill="white" />
			<text
				x="42"
				y="22"
				fill="white"
				fontFamily={FONT_FAMILY}
				fontSize="20"
				fontWeight="600"
				letterSpacing="-0.5"
			>
				Dev.log
			</text>
		</>
	);
};

const DarkThemeLogo = () => {
	const uid = useId().replace(/:/g, '');
	const gradId = `logo-grad-${uid}`;
	return (
		<>
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
			<rect
				width="32"
				height="32"
				rx="8"
				fill={`url(#${gradId})`}
				className="dark:hidden"
			/>
			<rect
				width="32"
				height="32"
				rx="8"
				fill="white"
				fillOpacity="0.9"
				className="hidden dark:block"
			/>
			<path
				d="M19 3L10 17L16 17L12 29L22 15L16 15Z"
				className="fill-white dark:fill-zinc-800"
			/>
			<text
				x="42"
				y="22"
				fontFamily={FONT_FAMILY}
				fontSize="22"
				fontWeight="600"
				letterSpacing="-0.5"
				className="fill-zinc-900 dark:fill-zinc-50"
			>
				Dev.log
			</text>
		</>
	);
};
