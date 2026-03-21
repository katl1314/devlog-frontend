import UserProfileSection from '@/app/(blog)/user/components/user-profile-section';
import UserPostCardList from '@/app/(blog)/user/components/user-post-card-list';
import PostSkeleton from '@/components/skeleton/post-skeleton';
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
	const user = await userService.findUserById(userId);

	return (
		<>
			<Card className="lg:bg-transparent lg:shadow-none">
				<UserProfileSection {...user} />
			</Card>
			<Card className="lg:bg-transparent lg:shadow-none">
				<section className="min-h-[500px]">
					<Suspense fallback={<PostFallback />}>
						<UserPostCardList userId={userId} />
					</Suspense>
				</section>
			</Card>
		</>
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
