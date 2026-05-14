'use client';

import { isEmpty } from '@/utils';
import { useSession } from 'next-auth/react';

interface ClientNotOwnerGuardProps {
	ownerId: string;
	children: React.ReactNode;
}

export default function ClientNotOwnerGuard({ ownerId, children }: ClientNotOwnerGuardProps) {
	const { data: session } = useSession();
	if (isEmpty(session) || session?.user?.id === ownerId) return null;

	return <>{children}</>;
}
