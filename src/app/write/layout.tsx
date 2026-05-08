import PostLayout from '@/components/layout/post-layout';
import React from 'react';
import './init.css';

export default function Layout({ children }: { children: React.ReactNode }) {
	return <PostLayout className="px-5 md:px-3">{children}</PostLayout>;
}
