import { cn } from '@/lib/utils';
import React from 'react';

export default function layout({ children }: { children: React.ReactNode }) {
	const mobile = 'mobile:max-w-[320px] ';
	const sm = 'sm:max-w-[640px]';
	const md = 'md:max-w-[768px]';
	return <div className={cn('mx-auto', 'my-0', 'mt-[50px]', 'px-[20px]', mobile, sm, md)}>{children}</div>;
}
