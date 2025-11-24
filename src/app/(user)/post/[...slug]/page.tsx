import PostBody from './components/PostBody';
import PostFooter from './components/PostFooter';
import PostHeader from './components/PostHeader';
import PostContextProvider from '@/components/Post/PostContextProvider';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {}

export default async function Page({
	params
}: {
	params: Promise<{ slug: string[] }>;
}) {
	return (
		<></>
		// <PostContextProvider {...post}>
		// 	<PostHeader {...post} />
		// 	<PostBody {...post} user={auth.data?.user} />
		// 	<PostFooter {...post} />
		// </PostContextProvider>
	);
}
