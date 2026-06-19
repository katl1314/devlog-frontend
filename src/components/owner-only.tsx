'use client';

import { useSession } from 'next-auth/react';
import { PropsWithChildren } from 'react';

export default function OwnerOnly({ userId, children }: { userId: string } & PropsWithChildren) {
	const { data: session } = useSession();
	const viewerId = (session?.user as { id?: string } | undefined)?.id;
	if (viewerId !== userId) return null;
	return <>{children}</>;
}
