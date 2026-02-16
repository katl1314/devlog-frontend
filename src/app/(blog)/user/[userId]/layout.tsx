import { userService } from '@/services/user.service';
import { notFound } from 'next/navigation';
import Header from '../components/Header';

export default async function Layout({
	children,
	params
}: {
	children: React.ReactNode;
	params: Promise<{ userId: string }>
}) {
	try {
		const { userId } = await params;
		const { blog  } = await userService.findUserById(userId);

		return (
			<>
				<Header userId={userId} title={blog.title} />
				<div className="mx-auto">
					{children}
				</div>
			</>
		);
	} catch {
		notFound();
	}
}
