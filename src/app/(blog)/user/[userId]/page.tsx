import UserProfileSection from '@/app/(blog)/user/components/user-profile-section';
import UserProfileTabNav from '@/app/(blog)/user/components/user-profile-tab-nav';
import PostList from '@/components/post/post-list';
import PostCardList from '@/components/post/post-card-list';
import PostSkeleton from './components/skeleton/post-skeleton';
import { FiFileText } from 'react-icons/fi';
import { userService } from '@/services/user.service';
import { ApiError } from '@/utils/db';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { Metadata } from 'next';

export const revalidate = 60;

export async function generateStaticParams() {
	try {
		const users = (await userService.findAll()) as Array<{ user_id: string }>;

		return users.map(({ user_id }) => ({
			userId: user_id
		}));
	} catch {
		return [];
	}
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

export default async function Page({ params }: { params: Promise<{ userId: string }> }) {
	const userId = (await params).userId;

	let user;
	try {
		user = await userService.findUserById(userId);
	} catch (error) {
		if (error instanceof ApiError && error.status === 404) {
			notFound();
		}
		throw error;
	}

	return (
		<>
			<div className="border-b border-border">
				<UserProfileSection {...user} />
			</div>
			<UserProfileTabNav userId={userId} />
			<section className="min-h-[500px]">
				<Suspense fallback={<PostFallback />}>
					<PostList userId={userId} />
				</Suspense>
			</section>
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
