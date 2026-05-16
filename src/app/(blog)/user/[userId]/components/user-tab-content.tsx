import UserAboutSection from '@/app/(blog)/user/components/user-about-section';
import UserSeriesSection from '@/app/(blog)/user/components/user-series-section';
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

// 탭 컨텐츠 렌더링
const TAB_RENDERERS: Record<string, (user: User) => React.ReactNode> = {
	about: user => (
		<UserAboutSection description={user.blog?.description} socials={user.socials} created_at={user.created_at} />
	),
	series: user => <UserSeriesSection userId={user.user_id} />,
	post: user => (
		<section className="min-h-125">
			<Suspense fallback={<PostFallback />}>
				<PostList userId={user.user_id} />
			</Suspense>
		</section>
	)
};

export default function UserTabContent({ tab, user }: { tab?: string; user: User }) {
	const category = isEmpty(tab) ? 'post' : tab;
	return <>{TAB_RENDERERS[category](user)}</>;
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
