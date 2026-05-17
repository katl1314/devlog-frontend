import UserProfileSection from '@/app/(blog)/user/components/user-profile-section';
import UserProfileTabNav from '@/app/(blog)/user/components/user-profile-tab-nav';
import UserTabContent from './components/user-tab-content';
import { userService } from '@/services/user.service';
import { ApiError } from '@/utils/db';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const revalidate = 60;

export async function generateStaticParams() {
	try {
		const users = (await userService.findAll()) as Array<{ user_id: string }>;
		return users.map(({ user_id }) => ({ userId: user_id }));
	} catch {
		return [];
	}
}

type Props = {
	params: Promise<{ userId: string }>;
	searchParams?: Promise<{ tab?: string; id?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { userId } = await params;
	return {
		title: `${userId}의 포스트`,
		description: `${userId}의 포스트입니다.`
	};
}

export default async function Page({ params, searchParams }: Props) {
	const { userId } = await params;
	const { tab, id } = (await searchParams) ?? {};

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
				<UserProfileSection
					{...user}
					followerCount={user.followers?.length ?? 0}
					followingCount={user.following?.length ?? 0}
				/>
			</div>
			<UserProfileTabNav userId={userId} />
			<UserTabContent tab={tab} seriesId={id} user={user} />
		</>
	);
}
