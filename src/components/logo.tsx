
interface ILogo {
	size?: number;
	variant?: 'dark' | 'white';
	className?: string;
}

const FONT_FAMILY = "ui-monospace, 'JetBrains Mono', 'Fira Code', 'SFMono-Regular', Menlo, Consolas, monospace";
const VB_HEIGHT = 32;
const VB_WIDTH = 148;

export default function Logo({ size = 32, variant = 'dark', className }: ILogo) {
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

export const WhiteThemeLogo = () => {
	return (
		<>
			<rect width="32" height="32" rx="8" fill="white" fillOpacity="0.12" />
			<path d="M19 3L10 17L16 17L12 29L22 15L16 15Z" fill="white" />
			<text x="42" y="22" fill="white" fontFamily={FONT_FAMILY} fontSize="20" fontWeight="600" letterSpacing="-0.5">
				Dev.log
			</text>
		</>
	);
};

export const DarkThemeLogo = () => {
	return (
		<>
			<rect width="32" height="32" rx="8" className="fill-[#18181b] dark:fill-white" />
			<path d="M19 3L10 17L16 17L12 29L22 15L16 15Z" className="fill-white dark:fill-zinc-800" />
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
