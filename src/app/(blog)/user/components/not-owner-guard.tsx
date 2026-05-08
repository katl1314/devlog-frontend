import { auth } from '@/auth';

interface NotOwnerGuardProps {
	ownerId: string;
	children: React.ReactNode;
}

export default async function NotOwnerGuard({ ownerId, children }: NotOwnerGuardProps) {
	const session = await auth();
	if (session?.user?.id === ownerId) return null;
	return <>{children}</>;
}
