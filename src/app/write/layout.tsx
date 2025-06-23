import PostLayout from '@/components/layout/PostLayout';
import React from 'react';
import './write.css';

export default function Layout({ children }: { children: React.ReactNode }) {
	return <PostLayout className="px-3">{children}</PostLayout>;
}
