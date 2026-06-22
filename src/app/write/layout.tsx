import React from 'react';
import './init.css';

export default function Layout({ children }: { children: React.ReactNode }) {
	return <div className="xl:px-100 px-1">{children}</div>;
}
