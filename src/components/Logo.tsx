import Link from 'next/link';

interface ILogo {
	className?: string;
	children?: React.ReactNode;
	href: string;
}

export default function Logo({ children, href, className }: ILogo) {
	return (
		<Link className={className} href={href}>
			{children}
		</Link>
	);
}
