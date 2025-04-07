import Link from 'next/link';

interface Logo {
	children: React.ReactNode;
	href: string;
}

export default function Logo({ children, href }: Logo) {
	return <Link href={href}>{children}</Link>;
}
