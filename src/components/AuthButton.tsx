'use client';

import React, { ButtonHTMLAttributes } from 'react';
import { Button } from './ui/button';
import { cn } from '@/utils/utils';

interface AuthButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon?: React.ReactElement;
	iconPosition?: 'left' | 'right';
}

export default function AuthButton({ value, icon, iconPosition, ...props }: AuthButton) {
	const content = generateIconButton(icon, value, iconPosition);
	return (
		<Button className={cn('h-[45px]', props.className)} {...props}>
			{content}
		</Button>
	);
}

function generateIconButton(
	icon: React.ReactNode,
	value: string | number | readonly string[] | undefined,
	iconPosition = 'left'
) {
	return icon ? (
		iconPosition === 'left' ? (
			<div className="flex items-center w-full">
				<div>{icon}</div> <div className="flex-1">{value}</div>
			</div>
		) : (
			<div className="flex items-center w-full">
				<div className="flex-1">{value}</div> <div>{icon}</div>
			</div>
		)
	) : (
		<>{value}</>
	);
}
