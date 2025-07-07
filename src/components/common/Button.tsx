'use client';

import React, { ButtonHTMLAttributes } from 'react';
import { Button as CustomButton, buttonVariants } from '../ui/button';
import { VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon?: React.ReactElement;
	iconPosition?: 'left' | 'right';
}

export default function Button({
	value,
	icon,
	iconPosition,
	className,
	...props
}: IButton & VariantProps<typeof buttonVariants>) {
	const content = generateIconButton(icon, value, iconPosition);
	return (
		<CustomButton className={cn(`flex items-center font-bold cursor-pointer`, className)} {...props}>
			{content}
		</CustomButton>
	);
}

function generateIconButton(
	icon: React.ReactNode,
	value: string | number | readonly string[] | undefined,
	iconPosition = 'left'
) {
	return icon ? (
		iconPosition === 'left' ? (
			<div className="flex items-center ">
				<div>{icon}</div> <div className="flex-1">{value}</div>
			</div>
		) : (
			<div className="flex items-center ">
				<div className="flex-1">{value}</div> <div>{icon}</div>
			</div>
		)
	) : (
		<>{value}</>
	);
}
