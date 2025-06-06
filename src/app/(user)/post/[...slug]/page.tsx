import PostBody from './components/PostBody';
import PostFooter from './components/PostFooter';
import PostHeader from './components/PostHeader';
import { Post } from '@/types/type';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
	// post 가져오기

	const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/posts`);

	if (!res.ok) return;

	const { data } = await res.json();

	return data.map(({ userId, path }: Post) => {
		const slug: string[] = [];
		slug[0] = userId;
		slug[1] = path.slice(path.lastIndexOf('/') + 1);
		return { slug };
	});
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
	const { slug } = await params;
	const path = `/@${slug[0]}/${slug[1]}`;
	const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/posts?postId=${path}`);

	if (!res.ok) {
		// error.tsx에서 처리해야한다.
		throw new Error('서버 오류가 발생하였습니다.');
	}

	const { data } = await res.json();
	// 찾을 수 없을 경우 notFound처리한다.
	if (data.length < 1) {
		notFound();
	}

	return (
		<>
			<PostHeader {...data[0]} />
			<PostBody {...data[0]} />
			<PostFooter {...data[0]} />
		</>
	);
}
