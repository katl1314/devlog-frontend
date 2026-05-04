'use client';

import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';

interface PostAuthorLinkProps {
	userId: string;
	isModal: boolean;
}

export default function PostAuthorLink({ userId, isModal }: PostAuthorLinkProps) {
	const router = useRouter();
	const href = `/@${userId}`;

	const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;

		e.preventDefault();

		if (isModal) {
			window.location.href = href;
		} else {
			router.push(href);
		}
	};

	return (
		<a href={href} onClick={onClick}>
			<Label className="text-foreground font-bold cursor-pointer hover:underline">
				{userId}
			</Label>
		</a>
	);
}
