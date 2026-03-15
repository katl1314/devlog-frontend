'use client';

export default function CardLayout({ children }: { children: React.ReactNode }) {
	return <div className="flex flex-col">{children}</div>;
}
