import UserProfileBottom from '../components/UserProfileBottom';
import Header from '@/app/(user)/user/components/Header';
import UserLayout from '@/components/layout/UserLayout';
import UserProfile from '../components/UserProfile';
import { Card } from '@/components/ui/card';
import { notFound } from 'next/navigation';
import { userService } from '@/services/user.service';

export default async function Layout({
	children,
	params
}: {
	children: React.ReactNode;
	params: Promise<{ slug: string }>
}) {
	try {
		const { slug } = await params;
		const { user_name, user_id, avatar_url, blog  } = await userService.findUserById(slug);

		const data = {
			avatar_url,
			description: blog.description, username: user_name, userId: user_id
		};

		return (
			<>
				<Header userId={slug} title={blog.title} />
				<div className="mx-auto">
					<UserLayout>
						<Card className="p-2 rounded-[0px] lg:p-0 lg:bg-transparent lg:shadow-none lg:border-0">
							<UserProfile {...data} />
							<UserProfileBottom />
						</Card>
						<Card className="mt-4 p-2 rounded-[0px] lg:mt-6 lg:p-0 lg:bg-transparent lg:shadow-none lg:border-0">
							<section className="min-h-[500px]">{children}</section>
						</Card>
					</UserLayout>
			</div>
			</>
		);
	} catch {
		notFound();
	}
}
