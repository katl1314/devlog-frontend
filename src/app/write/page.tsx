'use client';
import dynamic from 'next/dynamic';

const PostEditor = dynamic(() => import('@/components/Editor/PostEditor'), { ssr: false });

export default function Page() {
	return <PostEditor />;
}
