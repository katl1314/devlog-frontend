import { createClientByBrowser } from '@/utils/supabase/client';
import { Suspense } from 'react';
import PostList from '../components/PostList';

export async function generateStaticParams() {
	const supabase = createClientByBrowser();
	const { error, data } = await supabase.from('profiles').select();
	if (error) throw new Error(error.message);
	const params = data.map(({ userId }) => ({ slug: userId }));
	return params;
}

export const dynamicParams = false;

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
	const userId = (await params).slug;
	console.log(userId);
	return (
		<Suspense fallback={<PostFallback />}>
			<PostList />
		</Suspense>
	);
}

function PostFallback() {
	return (
		<div>
			{Array.from({ length: 10 }).map((_, index) => {
				return <div key={index} />;
			})}
		</div>
	);
}
