'use client';

import { useSession } from 'next-auth/react';
import { PropsWithChildren } from 'react';

export default function AuthOnly({ children }: PropsWithChildren) {
	const { data: session } = useSession();
	if (!session) return null;
	return <>{children}</>;
}
