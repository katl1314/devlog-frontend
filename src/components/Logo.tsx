import Link from 'next/link';

interface Logo {
	className?: string;
	children?: React.ReactNode;
	href: string;
}

export default function Logo({ children, href, className }: Logo) {
	return (
		<Link className={className} href={href}>
			{children}
		</Link>
	);
}
