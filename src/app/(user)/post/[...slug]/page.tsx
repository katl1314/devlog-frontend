import PostBody from './components/PostBody';
import PostFooter from './components/PostFooter';
import PostHeader from './components/PostHeader';
import PostContextProvider from '../../../../components/post/PostContextProvider';
import { createClientByBrowser } from '@/utils/supabase/client';
import { notFound } from 'next/navigation';
import { createClientByServer } from '@/utils/supabase/server';

export async function generateStaticParams() {
	const supabase = createClientByBrowser();
	const { data, error } = await supabase.from('posts').select('userId, path');

	if (error) throw new Error(error.message);

	return data.map(({ userId, path }) => {
		const slug: string[] = [];
		slug[0] = userId;
		slug[1] = path.slice(path.lastIndexOf('/') + 1);
		return { slug };
	});
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
	const supabase = await createClientByServer();
	const { slug } = await params;
	const auth = await supabase.auth.getUser();
	const id = auth.data.user?.id ?? '';
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_SITE_URL}/api/posts?postId=${`/@${slug[0]}/${slug[1]}`}&authId=${id}`
	);

	if (!res.ok) {
		// error.tsx에서 처리해야한다.
		throw new Error('서버 오류가 발생하였습니다.');
	}

	const { data } = await res.json();
	// 찾을 수 없을 경우 notFound처리한다.
	if (data.length < 1) {
		notFound();
	}

	const post = data[0];

	return (
		<PostContextProvider {...post}>
			<PostHeader {...post} />
			<PostBody {...post} user={auth.data?.user} />
			<PostFooter {...post} />
		</PostContextProvider>
	);
}
