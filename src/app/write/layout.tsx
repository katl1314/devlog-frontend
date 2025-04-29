import PageLayout from '@/components/Layout/PageLayout';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
	return <PageLayout>{children}</PageLayout>;
}
