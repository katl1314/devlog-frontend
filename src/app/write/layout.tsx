import PageLayout from '@/components/Layout/PageLayout';
import React from 'react';
import './write.css';
export default function Layout({ children }: { children: React.ReactNode }) {
	return <PageLayout className="px-3">{children}</PageLayout>;
}
