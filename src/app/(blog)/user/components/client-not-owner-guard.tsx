'use client';

import { useSession } from 'next-auth/react';

interface ClientNotOwnerGuardProps {
	ownerId: string;
	children: React.ReactNode;
}

export default function ClientNotOwnerGuard({ ownerId, children }: ClientNotOwnerGuardProps) {
	const { data: session } = useSession();
	if (session?.user?.id === ownerId) return null;
	return <>{children}</>;
}
