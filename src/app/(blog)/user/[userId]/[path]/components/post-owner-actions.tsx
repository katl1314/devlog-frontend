import { auth } from '@/auth';
import { PropsWithChildren } from 'react';

interface PostOwnerActionsProps extends PropsWithChildren {
	userId: string;
}

export default async function PostOwnerActions({
	userId,
	children
}: PostOwnerActionsProps) {
	const session = await auth();
	const viewerId = (session?.user as { id?: string } | undefined)?.id;

	if (viewerId !== userId) return null;

	return children;
}
