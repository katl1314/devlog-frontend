import { ReactNode } from 'react';

interface UserLayout {
	children?: ReactNode[] | ReactNode;
}

export default function UserLayout({ children }: UserLayout) {
	return <div className="lg:pt-16 px-2 xl:px-[400px] ">{children}</div>;
}
