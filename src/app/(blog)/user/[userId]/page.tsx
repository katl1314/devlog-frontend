import UserProfileBottom from '@/app/(blog)/user/components/user-profile-bottom';
import UserProfile from '@/app/(blog)/user/components/user-profile';
import PostSkeleton from '@/components/skeleton/post-skeleton';
import UserLayout from '@/components/layout/user-layout';
import { userService } from '@/services/user.service';
import { Card } from '@/components/ui/card';
import { Suspense } from 'react';
import { Metadata } from 'next';

export const dynamicParams = false;


export async function generateStaticParams() {
	const users = (await userService.findAll()) as Array<{ user_id: string }>;

	return users.map(({ user_id }) => ({
		userId: user_id
	}));
}

type Props = {
	params: Promise<{ userId: string }>;
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { userId } = await params;

	return {
		title: `${userId}의 포스트`,
		description: `${userId}의 포스트입니다.`
	};
}

export default async function Page({
	params
}: {
	params: Promise<{ userId: string }>;
}) {
	const userId = (await params).userId;
	const { user_name, user_id, avatar_url, blog  } = await userService.findUserById(userId);

	const data = {
		avatar_url,
		description: blog.description, username: user_name, userId: user_id
	};

	return (
		<UserLayout>
			<Card className="p-2 rounded-[0px] lg:p-0 lg:bg-transparent lg:shadow-none lg:border-0">
				<UserProfile {...data} />
				<UserProfileBottom />
			</Card>
			<Card className="mt-4 p-2 rounded-[0px] lg:mt-6 lg:p-0 lg:bg-transparent lg:shadow-none lg:border-0">
				<section className="min-h-[500px]">
					<Suspense fallback={<PostFallback />}>
						<div>메인페이지</div>
						{/* List를 그려야한다. */}
					</Suspense>
				</section>
			</Card>
		</UserLayout>

	);
}

function PostFallback() {
	return (
		<div>
			{Array.from({ length: 10 }).map((_, index) => {
				return <PostSkeleton key={index} />;
			})}
		</div>
	);
}
