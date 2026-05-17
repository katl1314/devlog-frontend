import UserAboutSection from '@/app/(blog)/user/components/user-about-section';
import UserSeriesSection from '@/app/(blog)/user/components/user-series-section';
import UserSeriesDetail from '@/app/(blog)/user/components/user-series-detail';
import PostList from '@/components/post/post-list';
import PostSkeleton from './skeleton/post-skeleton';
import { Suspense } from 'react';
import { isEmpty } from '@/utils';

type User = {
	user_id: string;
	blog?: { description?: string };
	socials?: Record<string, string> | null;
	created_at: string;
};

export default function UserTabContent({
	tab,
	seriesId,
	user
}: {
	tab?: string;
	seriesId?: string;
	user: User;
}) {
	const category = isEmpty(tab) ? 'post' : tab;

	if (category === 'series' && seriesId) {
		return <UserSeriesDetail seriesId={seriesId} userId={user.user_id} />;
	}

	if (category === 'series') {
		return <UserSeriesSection userId={user.user_id} />;
	}

	if (category === 'about') {
		return (
			<UserAboutSection
				description={user.blog?.description}
				socials={user.socials}
				created_at={user.created_at}
			/>
		);
	}

	return (
		<section className="min-h-125">
			<Suspense fallback={<PostFallback />}>
				<PostList userId={user.user_id} />
			</Suspense>
		</section>
	);
}

function PostFallback() {
	return (
		<div>
			{Array.from({ length: 10 }).map((_, index) => (
				<PostSkeleton key={index} />
			))}
		</div>
	);
}
